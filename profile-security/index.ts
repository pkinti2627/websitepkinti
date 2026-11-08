import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const cors = { 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods':'POST, OPTIONS' };
const reply=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers:{...cors,'Content-Type':'application/json'}});
const hash=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
const syntheticEmail=(username:string)=>'u'+Array.from(username.trim().toLowerCase()).map(ch=>ch.codePointAt(0)!.toString(16)).join('')+'@example.com';
Deno.serve(async(req)=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers:cors});if(req.method!=='POST')return reply({error:'Method not allowed'},405);
 try{
  const url=Deno.env.get('SUPABASE_URL')!, anon=Deno.env.get('SUPABASE_ANON_KEY')!, service=Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const auth=req.headers.get('Authorization')||'';const caller=createClient(url,anon,{global:{headers:{Authorization:auth}}});const {data:{user},error:ue}=await caller.auth.getUser();if(ue||!user)return reply({error:'Sesi login tidak valid.'},401);
  const admin=createClient(url,service);const {data:profile,error:pe}=await admin.from('profiles').select('id,username,role,recovery_email,recovery_email_verified').eq('id',user.id).single();if(pe||!profile)return reply({error:'Profil tidak ditemukan.'},404);
  const body=await req.json();const action=String(body.action||'');
  if(action==='set_avatar_url'){
   const avatarUrl=String(body.avatar_url||'');const allowedPrefix=`${url}/storage/v1/object/public/avatars/${user.id}/`;if(!avatarUrl.startsWith(allowedPrefix))return reply({error:'URL foto profil tidak valid.'},400);const {error}=await admin.from('profiles').update({avatar_url:avatarUrl}).eq('id',user.id);if(error)return reply({error:error.message},400);return reply({ok:true});
  }
  if(action==='change_username'){
   if(!/^[a-zA-Z0-9_.-]{3,24}$/.test(body.username||''))return reply({error:'Username 3–24 karakter; gunakan huruf, angka, titik, garis bawah, atau strip.'},400);
   const {data:exists}=await admin.from('profiles').select('id').ilike('username',body.username).neq('id',user.id).maybeSingle();if(exists)return reply({error:'Username sudah dipakai.'},409);
   const email=syntheticEmail(body.username);const {error:ae}=await admin.auth.admin.updateUserById(user.id,{email,email_confirm:true,user_metadata:{...user.user_metadata,username:body.username}});if(ae)return reply({error:ae.message},400);
   const {error:up}=await admin.from('profiles').update({username:body.username}).eq('id',user.id);if(up)return reply({error:up.message},400);return reply({ok:true});
  }
  if(action==='send_email_code'){
   const email=String(body.email||'').trim().toLowerCase();if(!/^\S+@\S+\.\S+$/.test(email))return reply({error:'Alamat email tidak valid.'},400);
   const code=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0');const codeHash=await hash(`${user.id}:verify_email:${email}:${code}`);
   await admin.from('profile_email_otps').delete().eq('user_id',user.id).eq('purpose','verify_email');const {error:ins}=await admin.from('profile_email_otps').insert({user_id:user.id,email,purpose:'verify_email',code_hash:codeHash,expires_at:new Date(Date.now()+10*60*1000).toISOString(),attempts:0});if(ins)return reply({error:ins.message},500);
   const resend=Deno.env.get('RESEND_API_KEY');const from=Deno.env.get('RESEND_FROM');if(!resend||!from)return reply({error:'Email sender belum dikonfigurasi (RESEND_API_KEY dan RESEND_FROM).'},503);
   const mail=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${resend}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],subject:'Kode verifikasi Aspiquest',html:`<p>Kode verifikasi email Aspiquest kamu:</p><p style="font-size:28px;font-weight:bold;letter-spacing:6px">${code}</p><p>Kode berlaku 10 menit. Jangan bagikan kode ini kepada siapa pun.</p>`})});if(!mail.ok)return reply({error:'Email tidak berhasil dikirim. Periksa konfigurasi Resend.'},502);return reply({ok:true});
  }
  if(action==='verify_email_code'){
   const email=String(body.email||'').trim().toLowerCase(),code=String(body.code||'').trim();const {data:otp}=await admin.from('profile_email_otps').select('*').eq('user_id',user.id).eq('purpose','verify_email').eq('email',email).order('created_at',{ascending:false}).limit(1).maybeSingle();if(!otp||new Date(otp.expires_at)<new Date()||otp.attempts>=5)return reply({error:'Kode kedaluwarsa atau tidak valid. Minta kode baru.'},400);
   if(await hash(`${user.id}:verify_email:${email}:${code}`)!==otp.code_hash){await admin.from('profile_email_otps').update({attempts:otp.attempts+1}).eq('id',otp.id);return reply({error:'Kode verifikasi salah.'},400)}
   await admin.from('profiles').update({recovery_email:email,recovery_email_verified:true}).eq('id',user.id);await admin.from('profile_email_otps').delete().eq('id',otp.id);return reply({ok:true});
  }
  if(action==='send_password_code'){
   if(!profile.recovery_email||!profile.recovery_email_verified)return reply({error:'Verifikasi email pemulihan terlebih dahulu.'},400);
   const email=profile.recovery_email,code=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,'0'),codeHash=await hash(`${user.id}:change_password:${email}:${code}`);
   await admin.from('profile_email_otps').delete().eq('user_id',user.id).eq('purpose','change_password');const {error:ins}=await admin.from('profile_email_otps').insert({user_id:user.id,email,purpose:'change_password',code_hash:codeHash,expires_at:new Date(Date.now()+10*60*1000).toISOString(),attempts:0});if(ins)return reply({error:ins.message},500);
   const resend=Deno.env.get('RESEND_API_KEY'),from=Deno.env.get('RESEND_FROM');if(!resend||!from)return reply({error:'Email sender belum dikonfigurasi (RESEND_API_KEY dan RESEND_FROM).'},503);
   const mail=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${resend}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],subject:'Kode keamanan Aspiquest',html:`<p>Kode untuk mengganti password Aspiquest:</p><p style="font-size:28px;font-weight:bold;letter-spacing:6px">${code}</p><p>Kode berlaku 10 menit. Jika kamu tidak meminta perubahan ini, abaikan email ini.</p>`})});if(!mail.ok)return reply({error:'Email tidak berhasil dikirim. Periksa konfigurasi Resend.'},502);return reply({ok:true});
  }
  if(action==='change_password'){
   if(!profile.recovery_email||!profile.recovery_email_verified)return reply({error:'Email pemulihan belum diverifikasi.'},400);const password=String(body.password||''),code=String(body.code||'').trim();if(password.length<8)return reply({error:'Password minimal 8 karakter.'},400);
   const {data:otp}=await admin.from('profile_email_otps').select('*').eq('user_id',user.id).eq('purpose','change_password').eq('email',profile.recovery_email).order('created_at',{ascending:false}).limit(1).maybeSingle();if(!otp||new Date(otp.expires_at)<new Date()||otp.attempts>=5)return reply({error:'Kode kedaluwarsa atau tidak valid. Minta kode baru.'},400);
   if(await hash(`${user.id}:change_password:${profile.recovery_email}:${code}`)!==otp.code_hash){await admin.from('profile_email_otps').update({attempts:otp.attempts+1}).eq('id',otp.id);return reply({error:'Kode keamanan salah.'},400)}
   const {error:pw}=await admin.auth.admin.updateUserById(user.id,{password});if(pw)return reply({error:pw.message},400);await admin.from('profile_email_otps').delete().eq('id',otp.id);return reply({ok:true});
  }
  return reply({error:'Action tidak dikenal.'},400);
 }catch(e){return reply({error:String((e as Error)?.message||e)},500)}
});
