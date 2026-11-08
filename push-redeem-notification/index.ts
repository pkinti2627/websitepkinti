import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import webpush from 'npm:web-push@3.6.7';
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization') || '';
    const caller = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user } } = await caller.auth.getUser();
    if (!user) return new Response(JSON.stringify({error:'Unauthorized'}), {status:401,headers:{...cors,'Content-Type':'application/json'}});
    const admin = createClient(url, service);
    const { data: recent } = await admin.from('redemptions').select('id,created_at,status').eq('user_id',user.id).eq('status','pending').gte('created_at',new Date(Date.now()-120000).toISOString()).order('created_at',{ascending:false}).limit(1);
    if (!recent?.length) return new Response(JSON.stringify({error:'No recent pending redemption'}), {status:403,headers:{...cors,'Content-Type':'application/json'}});
    const pub = Deno.env.get('VAPID_PUBLIC_KEY'); const priv = Deno.env.get('VAPID_PRIVATE_KEY'); const subject = Deno.env.get('VAPID_SUBJECT') || 'mailto:admin@example.com';
    if (!pub || !priv) return new Response(JSON.stringify({error:'VAPID keys are not configured'}), {status:503,headers:{...cors,'Content-Type':'application/json'}});
    webpush.setVapidDetails(subject,pub,priv);
    const { data: adminProfiles } = await admin.from('profiles').select('id').eq('role','pk_admin');
    const adminIds = (adminProfiles||[]).map(p=>p.id);
    const { data: subs } = adminIds.length ? await admin.from('push_subscriptions').select('id,user_id,subscription').in('user_id',adminIds) : {data:[]};
    const payload = JSON.stringify({title:'Aspiquest · Redeem Baru',body:'Ada siswa yang mengajukan penukaran hadiah. Buka Control Room untuk memeriksa.',url:'admin.html',tag:'aspiquest-redeem'});
    const results = await Promise.allSettled((subs||[]).map(s => webpush.sendNotification(s.subscription,payload)));
    const expired = results.map((r,i)=>({r,s:subs?.[i]})).filter(x=>x.r.status==='rejected' && [404,410].includes(x.r.reason?.statusCode));
    if (expired.length) await admin.from('push_subscriptions').delete().in('id',expired.map(x=>x.s.id));
    return new Response(JSON.stringify({ok:true,sent:results.filter(r=>r.status==='fulfilled').length}), {status:200,headers:{...cors,'Content-Type':'application/json'}});
  } catch (e) { return new Response(JSON.stringify({error:String(e?.message || e)}), {status:500,headers:{...cors,'Content-Type':'application/json'}}); }
});
