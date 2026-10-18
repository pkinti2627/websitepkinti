const SUPABASE_URL = 'https://fxvedprgoftcounrdjsv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vS9bGCJfA-oZQMzCKP3sJQ__bwznLQq';
const { createClient } = supabase;
// After generating VAPID keys, paste only the PUBLIC key here. Never put the private key in frontend code.
const VAPID_PUBLIC_KEY = 'PASTE_VAPID_PUBLIC_KEY_HERE';
const db = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: true, autoRefreshToken: true } });

const data = {
OSIS:[
{q:'Program OSIS seperti apa yang paling ingin kamu lihat?',type:'choice',options:['Kegiatan yang melibatkan banyak kelas','Kegiatan sosial dan pelayanan','Kompetisi atau acara kreatif','Kegiatan yang mendukung pengembangan siswa']},
{q:'Seberapa sering kamu mengetahui informasi tentang kegiatan OSIS?',type:'scale',options:['1 — Hampir tidak pernah','2 — Jarang','3 — Kadang-kadang','4 — Sering','5 — Hampir selalu']},
{q:'Lewat media apa kamu paling nyaman menerima informasi OSIS?',type:'choice',options:['Instagram / media sosial sekolah','WhatsApp / grup kelas','Pengumuman langsung di sekolah','Poster atau media visual di sekolah']},
{q:'Apa yang menurutmu sudah berjalan baik dari OSIS?',type:'text',placeholder:'Contoh: cara menyampaikan informasi, kegiatan tertentu, dll.'},
{q:'Menurutmu, hal apa yang paling perlu dikembangkan oleh OSIS?',type:'text',placeholder:'Tulis jawabanmu dengan bebas...'}],
PK:[
{q:'Hal apa yang paling ingin kamu sampaikan melalui PK?',type:'choice',options:['Fasilitas dan lingkungan sekolah','Akademik dan pembelajaran','Kegiatan atau kehidupan siswa','Komunikasi dan penyampaian aspirasi']},
{q:'Cara komunikasi PK mana yang paling nyaman untukmu?',type:'choice',options:['Form aspirasi online','Disampaikan melalui ketua kelas','Berbicara langsung dengan anggota PK','Forum atau diskusi kelas']},
{q:'Seberapa mudah kamu menyampaikan aspirasi kepada PK saat ini?',type:'scale',options:['1 — Sangat sulit','2 — Sulit','3 — Cukup mudah','4 — Mudah','5 — Sangat mudah']},
{q:'Setelah menerima aspirasi, menurutmu PK paling perlu melakukan apa?',type:'choice',options:['Menyampaikan kepada pihak yang berwenang','Membahasnya bersama siswa','Memberikan perkembangan atau kabar balik','Menentukan prioritas masalah yang perlu diperjuangkan']},
{q:'Pernah ada situasi yang membuatmu ingin menyampaikan aspirasi melalui PK? Ceritakan jika ada.',type:'text',placeholder:'Tidak perlu formal. Ceritakan singkat saja...'},
{q:'Apa perubahan yang ingin kamu lihat dari cara PK menampung aspirasi siswa?',type:'text',placeholder:'Ceritakan usulanmu dengan jelas...'}],
'Fasilitas & Lingkungan':[
{q:'Fasilitas apa yang menurutmu paling perlu mendapat perhatian?',type:'choice',options:['Ruang kelas','Toilet','Area kantin dan makan','Tempat duduk / area istirahat','Sarana olahraga']},
{q:'Area sekolah mana yang paling sering kamu gunakan dan perlu dibuat lebih nyaman?',type:'choice',options:['Kelas','Kantin','Lapangan / area olahraga','Koridor / area tunggu','Perpustakaan']},
{q:'Seberapa sering kamu menemukan fasilitas sekolah yang kurang nyaman digunakan?',type:'scale',options:['1 — Tidak pernah','2 — Jarang','3 — Sesekali','4 — Sering','5 — Hampir setiap hari']},
{q:'Perbaikan seperti apa yang menurutmu paling terasa manfaatnya?',type:'choice',options:['Menambah atau memperbaiki fasilitas','Meningkatkan kebersihan','Menata ulang ruang atau area','Membuat fasilitas lebih mudah digunakan']},
{q:'Kalau ada satu fasilitas yang ingin kamu ubah atau tambahkan, apa itu dan kenapa?',type:'text',placeholder:'Tulis detailnya...'},
{q:'Apa dampak perubahan fasilitas itu bagi kegiatan belajar siswa?',type:'text',placeholder:'Jelaskan manfaat yang kamu harapkan...'}],
'Akademik & Pembelajaran':[
{q:'Bagian dari proses belajar apa yang menurutmu paling perlu dikembangkan?',type:'choice',options:['Metode pembelajaran di kelas','Pengelolaan tugas','Materi dan penjelasan','Kegiatan praktik / proyek','Persiapan ujian']},
{q:'Cara belajar seperti apa yang paling membantu kamu memahami materi?',type:'choice',options:['Penjelasan langsung dari guru','Contoh soal dan latihan','Diskusi kelompok','Praktik atau proyek','Media visual / digital']},
{q:'Seberapa sering beban tugas terasa sulit untuk dikelola?',type:'scale',options:['1 — Hampir tidak pernah','2 — Jarang','3 — Kadang-kadang','4 — Sering','5 — Sangat sering']},
{q:'Dukungan akademik apa yang paling ingin kamu dapatkan ketika mengalami kesulitan?',type:'choice',options:['Waktu konsultasi tambahan','Penjelasan ulang materi','Latihan tambahan','Materi atau rangkuman belajar','Pendampingan belajar']},
{q:'Apa satu hal dalam pengalaman belajar di sekolah yang menurutmu perlu diperbaiki?',type:'text',placeholder:'Tulis pengalaman atau saranmu...'},
{q:'Menurutmu, bagaimana perubahan itu bisa membantu siswa belajar lebih baik?',type:'text',placeholder:'Jelaskan alasan dan contoh...'}],
'Guru & Karyawan':[
{q:'Hal apa dari cara guru atau karyawan membantu siswa yang paling kamu hargai?',type:'choice',options:['Mau mendengarkan siswa','Cepat membantu ketika ada masalah','Memberikan penjelasan yang jelas','Ramah dan mudah diajak berbicara','Memberikan arahan yang membantu']},
{q:'Dalam situasi apa kamu biasanya membutuhkan bantuan guru atau karyawan?',type:'choice',options:['Saat mengalami kesulitan belajar','Saat membutuhkan informasi sekolah','Saat ada masalah dengan teman','Saat mengikuti kegiatan sekolah','Saat membutuhkan arahan atau bantuan lainnya']},
{q:'Kalau membutuhkan bantuan, cara komunikasi seperti apa yang paling membuatmu nyaman?',type:'choice',options:['Berbicara langsung','Chat / pesan','Melalui wali kelas atau guru tertentu','Melalui layanan sekolah']},
{q:'Seberapa puas kamu dengan bantuan yang diberikan guru atau karyawan ketika kamu membutuhkannya?',type:'scale',options:['1 — Sangat tidak puas','2 — Tidak puas','3 — Cukup puas','4 — Puas','5 — Sangat puas']},
{q:'Apa yang menurutmu bisa ditingkatkan dari cara guru atau karyawan membantu siswa?',type:'text',placeholder:'Tulis dengan jujur dan tetap sopan...'},
{q:'Apa bentuk dukungan yang akan paling membantu siswa ke depannya?',type:'text',placeholder:'Ceritakan usulanmu...'}],
'Kehidupan Siswa':[
{q:'Bagian dari kehidupan siswa di sekolah apa yang paling ingin kamu kembangkan?',type:'choice',options:['Kegiatan dan organisasi siswa','Relasi antar siswa','Kenyamanan suasana sekolah','Kesempatan menyampaikan pendapat','Kegiatan sosial dan kebersamaan']},
{q:'Hal apa yang paling memengaruhi kenyamananmu sebagai siswa di sekolah?',type:'choice',options:['Lingkungan yang aman dan nyaman','Hubungan dengan teman','Hubungan dengan guru','Kegiatan sekolah','Kesempatan untuk didengar']},
{q:'Dukungan apa yang paling kamu butuhkan sebagai siswa?',type:'choice',options:['Ruang untuk menyampaikan aspirasi','Kegiatan yang lebih beragam','Pendampingan ketika ada masalah','Informasi sekolah yang lebih jelas','Kesempatan berkolaborasi dengan siswa lain']},
{q:'Bagaimana kamu paling nyaman menyampaikan pendapat tentang kehidupan siswa?',type:'choice',options:['Form online seperti Aspiquest','Forum kelas','Diskusi langsung','Melalui PK / perwakilan siswa']},
{q:'Apa pengalaman atau hal di kehidupan sekolah yang ingin kamu lihat menjadi lebih baik?',type:'text',placeholder:'Ceritakan secara bebas...'},
{q:'Apa langkah nyata yang menurutmu bisa membuat pengalaman siswa lebih baik?',type:'text',placeholder:'Jelaskan ide dan manfaatnya...'}]};

let currentUser=null, currentScore=0, type='', pts=0, area='', selected={};
const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(t){const x=$('toast');if(!x)return;x.textContent=t;x.classList.add('on');setTimeout(()=>x.classList.remove('on'),2300)}
function confetti(){for(let i=0;i<34;i++){const c=document.createElement('i');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.animationDelay=(Math.random()*.25)+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),1800)}}
function speakGuide(text, mood='talk'){const box=$('guideBubble'),img=$('guideImg');if(!box)return;showGuide();box.classList.remove('show');if(img)img.classList.remove('bounce','wave');setTimeout(()=>{box.textContent=text;box.classList.add('show');if(img)img.classList.add(mood==='wave'?'wave':'bounce')},90)}
function hideGuide(){const g=$('guide');if(g)g.classList.remove('show')}
function showGuide(){const g=$('guide');if(g)g.classList.add('show')}
function openLogin(){ $('opening')?.classList.add('hidden'); $('loginScreen')?.classList.remove('hidden'); speakGuide('👋 Hai! Selamat datang di Aspiquest. Di sini kamu bisa menyampaikan pendapat, ide, dan masukan tentang sekolah. Yuk, mulai!');}
function setLoginMode(mode){$('studentMode').classList.toggle('active',mode==='student');$('adminMode').classList.toggle('active',mode==='admin');$('studentLogin').classList.toggle('hidden',mode!=='student');$('adminLogin').classList.toggle('hidden',mode!=='admin');$('loginError').textContent='';}
function showRegister(){ $('studentLogin').classList.add('hidden');$('registerLogin').classList.remove('hidden');$('adminLogin').classList.add('hidden');$('studentMode').classList.add('active');$('adminMode').classList.remove('active');speakGuide('Bikin akun dulu. Username-nya bebas, tapi jangan lupa kelas dan nomor absen ya.');}
function showStudentLogin(){setLoginMode('student');speakGuide('Oke, masuk lagi aja. Setelah login kita langsung ke Mission Hub.');}
function syntheticEmail(username){
 const normalized=username.trim().toLowerCase();
 const encoded=Array.from(normalized).map(ch=>ch.codePointAt(0).toString(16)).join('');
 return 'u'+encoded+'@example.com';
}
async function registerStudent(){
 const username=$('regUser').value.trim(), password=$('regPass').value, kelas=$('regClass').value.trim(), absen=$('regAbs').value.trim();
 if(!username||!password||!kelas||!absen)return setErr('Semua data wajib diisi ya.');
 if(password.length<8)return setErr('Password minimal 8 karakter.');
 setBusy(true,'Membuat akun...');
 const {data:d,error}=await db.auth.signUp({email:syntheticEmail(username),password,options:{data:{username,class_name:kelas,attendance_no:absen}}});
 setBusy(false);if(error)return setErr(authError(error));
 if(!d.session){return setErr('Akun dibuat, tetapi email confirmation masih aktif. Matikan Email Confirmations di Supabase Auth.');}
 let loaded=false; for(let i=0;i<6;i++){try{await loadMe();loaded=true;break}catch(e){await sleep(500)}} if(!loaded)return setErr('Akun berhasil dibuat, tetapi profil siswa belum siap. Coba masuk lagi dengan username dan password yang baru dibuat.'); ; location.href='student.html';
}
async function getAdminEmail(identifier){
 const value=identifier.trim();
 if(value.includes('@')) return value;
 const {data,error}=await db.rpc('get_pk_admin_email',{identifier:value});
 if(error)throw new Error('Setup PK Inti belum selesai. Jalankan SUPABASE_SETUP_SAFE.sql sekali di Supabase.');
 return data;
}
async function login(){
 const admin=!$('adminLogin').classList.contains('hidden'); setBusy(true,'Memeriksa akun...');
 try{
  let email,pass;
  if(admin){email=await getAdminEmail($('adminUser').value.trim());pass=$('adminPass').value;if(!email)throw new Error('Username PK Inti tidak ditemukan.');}
  else{const u=$('studentUser').value.trim();pass=$('studentPass').value;email=syntheticEmail(u);}
  const {error}=await db.auth.signInWithPassword({email,password:pass});if(error)throw new Error(authError(error));
  await loadMe();
  if(currentUser.role==='pk_admin')location.href='admin.html'; else location.href='student.html';
 }catch(e){setErr(e.message)}finally{setBusy(false)}
}
function setErr(t){$('loginError').textContent=t}
function setBusy(on,label){document.querySelectorAll('button').forEach(b=>{if(b.dataset.keep!=='1')b.disabled=on});const x=$('loginSubmit');if(x&&!on)x.textContent='ENTER ASPIQUEST ✦';if(x&&on)x.textContent=label||'Loading...'}
function authError(e){if(/Invalid login credentials/i.test(e.message))return'Username atau password salah.';if(/Email not confirmed/i.test(e.message))return'Email confirmation masih aktif di Supabase. Matikan konfirmasi email dulu.';return e.message}
function togglePassword(id,cb){const el=$(id);if(el)el.type=cb.checked?'text':'password'}
async function loadMe(){const {data:{user}}=await db.auth.getUser();if(!user)throw new Error('Belum login.');const {data:p,error}=await db.from('profiles').select('id,username,class_name,attendance_no,role,points').eq('id',user.id).single();if(error)throw error;currentUser={...p,email:user.email};currentScore=Number(p.points||0);return currentUser}
function goStudent(){location.href='student.html'}
function goAdmin(){location.href='admin.html'}
async function bootIndex(){if(!$('loginScreen'))return;const {data:{session}}=await db.auth.getSession();if(session){try{await loadMe();location.href=currentUser.role==='pk_admin'?'admin.html':'student.html';return}catch(e){console.warn('Aspiquest session/profile check:',e);await db.auth.signOut();}}}

async function bootStudent(){
 try{
  await loadMe();
  if(currentUser.role!=='student'){ location.href='admin.html'; return; }
  renderStudent(); await loadStudentExtras();
  // Student page intentionally does NOT subscribe to realtime profile updates.
  // This prevents background auth/realtime activity from interfering with the form.
  tutorial();
 }catch(e){
  console.warn('Student boot:',e);
  const path=(location.pathname||'').toLowerCase();
  if(path.endsWith('/student.html') || path.endsWith('student.html')){
    const ok=await db.auth.getSession();
    if(!ok?.data?.session){ location.href='index.html'; }
  }
 }
}
function renderStudent(){
 $('userName').textContent=currentUser.username;$('profileName').textContent=currentUser.username;$('profileMeta').textContent=currentUser.class_name+' · Absen '+currentUser.attendance_no;$('scoreName').textContent=currentUser.username;$('score').textContent=currentScore+' PTS';$('fill').style.width=Math.min(currentScore,100)+'%';
}
function scrollToMissions(){hideGuide();$('missions').scrollIntoView({behavior:'smooth'});setTimeout(()=>speakGuide('Nah, ini Mission Hub! Pilih misi yang paling pengin kamu isi. Santai, cuma sebentar kok.'),500)}
function tutorial(){showGuide();speakGuide('👋 Hai! Selamat datang di Aspiquest. Di sini kamu bisa menyampaikan pendapat, ide, dan masukan tentang sekolah. Yuk, mulai!');const skip=()=>{hideGuide()};const next=()=>{openLogin()};if($('guideNext'))$('guideNext').onclick=next;if($('guideSkip'))$('guideSkip').onclick=skip;if($('guideClose'))$('guideClose').onclick=skip;}
function setupRealtimeStudent(){db.channel('student-profile').on('postgres_changes',{event:'UPDATE',schema:'public',table:'profiles',filter:`id=eq.${currentUser.id}`},payload=>{if(payload.new){currentScore=Number(payload.new.points||0);renderStudent();toast('⚡ Poin kamu baru saja diperbarui!')}}).subscribe();}
function toggleProfile(){const m=$('profileMenu');m.classList.toggle('open')}
async function logout(){await db.auth.signOut();location.href='index.html'}
function showProfile(){toggleProfile();alert(`Profile\n${currentUser.username}\n${currentUser.class_name} · Absen ${currentUser.attendance_no}\n\n${currentScore} PTS`)}
function openMission(t,p){type=t;pts=p;area='';selected={};showModal();$('pickView').classList.add('hidden');$('form').classList.remove('hidden');$('ftitle').textContent=t+' · +'+p+' PTS';renderQuestions(data[t]);speakGuide(t==='OSIS'?'Oke, kita mulai dari OSIS! 👀 Jawab sesuai pengalaman kamu ya.':'Gas, masuk ke misi PK! Pendapat kamu bakal dibaca beneran.');}
function openSchool(){type='Sekolah';pts=10;area='';selected={};showModal();$('form').classList.add('hidden');$('pickView').classList.remove('hidden');$('badge').textContent='SCHOOL MISSION · +10 PTS';$('mtitle').textContent='Pilih Area Aspirasi';$('desc').textContent='Masuk ke bagian yang paling sesuai dengan pengalamanmu.';const areas=[['🏢','Fasilitas & Lingkungan'],['📚','Akademik & Pembelajaran'],['🧑‍🏫','Guru & Karyawan'],['💬','Kehidupan Siswa']];$('choices').innerHTML=areas.map((x,i)=>`<button type="button" class="choice school-choice" data-area-index="${i}"><b>${x[0]} ${x[1]}</b><small>Masuk ke section ini →</small></button>`).join('');$('choices').onclick=e=>{const btn=e.target.closest('.school-choice');if(btn)pickArea(areas[Number(btn.dataset.areaIndex)][1])};speakGuide('Sekolah punya 4 area. Pilih yang paling relate sama pengalamanmu.');}
function pickArea(x){area=x;$('pickView').classList.add('hidden');$('form').classList.remove('hidden');$('ftitle').textContent='Sekolah · '+x+' · +10 PTS';renderQuestions(data[x]);speakGuide('Sip. Santai aja, nggak harus panjang. Yang penting jujur dan masuk akal.');}
function renderQuestions(list){selected={};$('questions').innerHTML=list.map((item,i)=>{if(item.type==='text')return `<div class="question">${i+1}. ${item.q}</div><div class="field"><textarea class="input textarea qtext" data-i="${i}" placeholder="${esc(item.placeholder||'Tulis jawabanmu...')}"></textarea><small class="word-counter" data-counter="q${i}">0 kata · minimal 75</small></div>`;return `<div class="question">${i+1}. ${item.q}</div><div class="choices question-choices" data-question="${i}">${item.options.map((o,j)=>`<button type="button" class="choice answer-choice" data-question="${i}" data-option="${j}"><b>${esc(o)}</b></button>`).join('')}<button type="button" class="choice answer-choice other-choice" data-question="${i}" data-option="other"><b>Lainnya — isi sendiri</b><small>Tulis jawabanmu sendiri</small></button><div class="other-field hidden" data-other-for="${i}"><input class="input other-input" data-i="${i}" placeholder="Tulis jawabanmu sendiri..."></div></div>`}).join('');$('progressFill').style.width='0%';$('answer').value='';const critiqueCounter=document.querySelector('[data-counter="critique"]');if(critiqueCounter)critiqueCounter.textContent='0 kata · minimal 75';$('questions').onclick=e=>{const btn=e.target.closest('.answer-choice');if(btn)choose(btn,Number(btn.dataset.question))}}
function choose(el,i){el.parentElement.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');selected[i]=el.dataset.option==='other'?'':el.querySelector('b').innerText;if(el.dataset.option==='other'){const f=el.parentElement.querySelector('.other-field');f.classList.remove('hidden');f.querySelector('input').focus();speakGuide('Lainnya? Boleh banget. Tulis aja jawaban versi kamu.')}else{const f=el.parentElement.querySelector('.other-field');if(f)f.classList.add('hidden')}updateProgress();}
function updateProgress(){const list=data[area||type]||[];let done=0;list.forEach((q,i)=>{if(q.type==='text'){const el=document.querySelector('.qtext[data-i="'+i+'"]');if(el&&el.value.trim())done++}else if(selected[i]||document.querySelector('.other-input[data-i="'+i+'"]')?.value.trim())done++});$('progressFill').style.width=Math.round(done/list.length*100)+'%';if(done===list.length)speakGuide('Dikit lagi! Jangan lupa isi Kritik & Saran di paling bawah ya 👀');}
document.addEventListener('input',e=>{if(e.target.classList.contains('qtext')||e.target.classList.contains('other-input')){updateProgress();if(e.target.classList.contains('qtext')){const c=document.querySelector('[data-counter="q'+e.target.dataset.i+'"]');if(c)c.textContent=wordCount(e.target.value)+' kata · minimal 75'}}if(e.target.id==='answer'){const c=document.querySelector('[data-counter="critique"]');if(c)c.textContent=wordCount(e.target.value)+' kata · minimal 75'}});
function wordCount(v){return String(v||'').trim().split(/\s+/).filter(Boolean).length}
function showModal(){$('modal').classList.add('show');}
function closeM(){hideGuide();$('modal').classList.remove('show');$('thanks').classList.add('hidden');$('form').classList.add('hidden');$('pickView').classList.remove('hidden')}
function back(){if(type==='Sekolah'&&area){area='';$('form').classList.add('hidden');$('pickView').classList.remove('hidden');speakGuide('Balik ke pilihan area dulu.');}else closeM()}
async function submitM(){
 const list=data[area||type]||[];let answers=[];let missing=false;list.forEach((q,i)=>{if(q.type==='text'){const el=document.querySelector('.qtext[data-i="'+i+'"]');if(!el||!el.value.trim())missing=true;answers.push({question:q.q,type:q.type,answer:el?.value.trim()||''})}else{let val=selected[i];const other=document.querySelector('.other-input[data-i="'+i+'"]');if(!val&&other?.value.trim())val=other.value.trim();if(!val)missing=true;answers.push({question:q.q,type:q.type,answer:val})}});if(missing){toast('Masih ada pertanyaan yang belum dijawab 😭');speakGuide('Eits, masih ada yang kosong. Cek lagi yang belum keisi ya.');return}const critique=$('answer').value.trim();if(!critique){toast('Kritik & Saran wajib diisi.');$('answer').focus();return}const freeTexts=answers.filter(a=>a.type==='text').map(a=>a.answer);freeTexts.push(critique);const qualifying=freeTexts.filter(v=>wordCount(v)>=75).length;if(answers.filter(a=>a.type==='text').some(a=>wordCount(a.answer)>150)||wordCount(critique)>150){toast('Setiap jawaban mandiri maksimal 150 kata.');return}
 try{const {data:m,error:me}=await db.from('missions').select('id,points,active').eq('code',type==='Sekolah'?'SEKOLAH':type).eq('active',true).single();if(me)throw me;const payload={user_id:currentUser.id,mission_id:m.id,school_category:area||null,answers:{responses:answers,critique,qualifying_count:qualifying}};const {error}=await db.from('submissions').insert(payload);if(error)throw error;await sleep(350);await loadMe();renderStudent();$('form').classList.add('hidden');$('pickView').classList.add('hidden');$('thanks').classList.remove('hidden');const base=type==='Sekolah'?10:5;const earned=Math.round((base*qualifying/3)*100)/100;$('earned').textContent='+'+earned+' PTS ⭐ · Poin dapat dipakai di katalog redeem';await loadStudentExtras();confetti();speakGuide('🎉 YAY, SELESAI! Terima kasih udah meluangkan waktu. Jawaban kamu sudah masuk ke PK Inti.','wave');}catch(e){toast(e.message||'Gagal mengirim.');}
}
function finishThanks(){closeM();scrollToMissions()}

async function bootAdmin(){
 try{await loadMe();if(currentUser.role!=='pk_admin')return location.href='student.html';await loadAdmin();await adminExtraLoad();setupRealtimeAdmin();}catch{location.href='index.html'}
}
async function loadAdmin(){
 const {data:profiles,error:pErr}=await db.from('profiles').select('id,username,class_name,attendance_no,points,role').order('points',{ascending:false});if(pErr)throw pErr;
 const {data:subs,error:sErr}=await db.from('submissions').select('id,user_id,mission_id,school_category,answers,points_awarded,created_at').order('created_at',{ascending:false}).limit(50);if(sErr)throw sErr;
 const {data:missions}=await db.from('missions').select('id,code,title,points');
 const missionMap=Object.fromEntries((missions||[]).map(m=>[m.id,m]));const profMap=Object.fromEntries((profiles||[]).map(p=>[p.id,p]));
 const students=(profiles||[]).filter(p=>p.role==='student');const totalPoints=students.reduce((a,p)=>a+Number(p.points||0),0);$('statStudents').textContent=students.length;$('statAspirations').textContent=(subs||[]).length;$('statPoints').textContent=totalPoints;
 const grouped={};(subs||[]).forEach(s=>{if(!grouped[s.user_id])grouped[s.user_id]=[];grouped[s.user_id].push(s)});const people=Object.entries(grouped).sort((a,b)=>new Date(b[1][0].created_at)-new Date(a[1][0].created_at)).slice(0,20);$('latest').innerHTML=people.length?people.map(([uid,items])=>{const p=profMap[uid]||{};const total=items.reduce((sum,x)=>sum+Number(x.points_awarded||missionMap[x.mission_id]?.points||0),0);const blocks=items.map((s,idx)=>{const m=missionMap[s.mission_id]||{};const responses=Array.isArray(s.answers?.responses)?s.answers.responses:[];const rows=responses.map((r,i)=>`<div class="response-row"><div class="response-q">${i+1}. ${esc(r.question||'Pertanyaan')}</div><div class="response-a">${esc(r.answer||'—')}</div></div>`).join('');const critique=s.answers?.critique||'';return `<div class="submission-block"><div class="submission-head"><b>${esc(m.code||'MISSION')}${s.school_category?' · '+esc(s.school_category):''}</b><span>+${esc(s.points_awarded||m.points||0)} pts · ${new Date(s.created_at).toLocaleString('id-ID')}</span></div><details class="response-details"><summary>Lihat semua jawaban (${responses.length})</summary><div class="response-list">${rows||'<div class="response-a">Tidak ada jawaban tersimpan.</div>'}</div></details><div class="critique-box"><b>Kritik &amp; Saran</b><p>${esc(critique||'Tidak ada kritik/saran terpisah.')}</p></div></div>`}).join('');return `<div class="asp-item"><div class="asp-top"><b>${esc(p.username||'Siswa')}</b><strong>${total} PTS</strong></div><small>${esc(p.class_name||'')} · Absen ${esc(p.attendance_no||'')} · ${items.length} aspirasi</small><div class="merged-submissions">${blocks}</div></div>`}).join(''):'<p style="color:#718099">Belum ada aspirasi yang masuk.</p>';
 const mb={OSIS:0,PK:0,Sekolah:0};(subs||[]).forEach(s=>{const c=missionMap[s.mission_id]?.code||'Lainnya';mb[c==='SEKOLAH'?'Sekolah':c]=(mb[c==='SEKOLAH'?'Sekolah':c]||0)+1});$('missionBreakdown').innerHTML=Object.entries(mb).map(([k,v])=>`<div class="break-row"><span>${esc(k)}</span><b>${v}</b></div>`).join('');
 const participants=students.slice().sort((a,b)=>Number(b.points||0)-Number(a.points||0)||String(a.username||'').localeCompare(String(b.username||'')));$('classBreakdown').innerHTML=participants.length?`<div class="participation-count">Menampilkan ${participants.length} siswa</div>`+participants.map((p,i)=>`<div class="break-row participant-row"><span><b>${i+1}.</b> ${esc(p.username||'Siswa')} <small>${esc(p.class_name||'—')} · Absen ${esc(p.attendance_no||'—')}</small></span><b>${Number(p.points||0)} PTS</b></div>`).join(''):'<p>Belum ada siswa.</p>';
 const now=new Date();$('lastUpdated').textContent='Updated '+now.toLocaleTimeString('id-ID');
}
function setupRealtimeAdmin(){db.channel('aspiquest-control-room').on('postgres_changes',{event:'*',schema:'public',table:'submissions'},()=>{loadAdmin().catch(()=>{});adminExtraLoad()}).on('postgres_changes',{event:'UPDATE',schema:'public',table:'profiles'},()=>{loadAdmin().catch(()=>{});adminExtraLoad()}).subscribe();}



function urlBase64ToUint8Array(base64String){const padding='='.repeat((4-base64String.length%4)%4);const base64=(base64String+padding).replace(/-/g,'+').replace(/_/g,'/');const raw=atob(base64);return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)))}
async function enablePushNotifications(){
 if(currentUser?.role!=='pk_admin')return toast('Fitur notifikasi redeem hanya untuk anggota PK Inti.');
 if(!('serviceWorker' in navigator)||!('PushManager' in window)||!('Notification' in window))return toast('Browser/perangkat ini belum mendukung push notification.');
 if(VAPID_PUBLIC_KEY==='PASTE_VAPID_PUBLIC_KEY_HERE')return toast('Push belum dikonfigurasi: isi VAPID public key setelah setup server.');
 try{const permission=await Notification.requestPermission();if(permission!=='granted')return toast('Izin notifikasi belum diberikan.');const reg=await navigator.serviceWorker.register('./service-worker.js');let sub=await reg.pushManager.getSubscription();if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:urlBase64ToUint8Array(VAPID_PUBLIC_KEY)});const json=sub.toJSON();const {error}=await db.from('push_subscriptions').upsert({user_id:currentUser.id,endpoint:json.endpoint,subscription:json},{onConflict:'endpoint'});if(error)throw error;toast('Notifikasi berhasil diaktifkan di perangkat ini!');}catch(e){toast('Gagal mengaktifkan notifikasi: '+(e.message||e));}
}

async function loadStudentExtras(){
 if(!$('rewardCatalog'))return;
 try{
  const {data:windowData}=await db.from('redeem_settings').select('*').eq('id',1).maybeSingle();
  const now=new Date(),start=windowData?.starts_at?new Date(windowData.starts_at):null,end=windowData?.ends_at?new Date(windowData.ends_at):null;
  const isOpen=!!windowData?.is_open&&(!start||now>=start)&&(!end||now<=end);
  const sec=$('redeemSection');if(sec)sec.classList.toggle('hidden',!isOpen);
  if($('redeemPeriodLabel'))$('redeemPeriodLabel').textContent=isOpen?'Periode redeem dibuka':'Periode belum diumumkan';
  if($('redeemStatus'))$('redeemStatus').innerHTML=isOpen?'<div class="mystery-icon">🎁</div><div><b>Redeem sedang dibuka!</b><p>Pilih hadiah sesuai poin yang kamu punya.</p></div>':'<div class="mystery-icon">🗓️</div><div><b>Belum ada periode redeem</b><p>Section redeem akan muncul saat PK Inti membuka periode penukaran.</p></div>';
  if(isOpen){const {data:rewards}=await db.from('rewards').select('*').eq('active',true).order('points_cost');$('rewardCatalog').innerHTML=(rewards||[]).map(r=>`<article class="card"><div class="icon">${r.is_mystery?'🎁':'📚'}</div><h3>${esc(r.is_mystery?'Mystery Reward':r.name)}</h3><p>${esc(r.is_mystery?'Hadiah misteri eksklusif':r.description||'Hadiah untuk menunjang kegiatan sekolah')}</p><div class="pts">${r.points_cost} PTS · stok ${r.stock}</div><button class="btn" onclick="requestRedeem('${r.id}')" ${Number(currentScore)<Number(r.points_cost)||Number(r.stock)<=0?'disabled':''}>Redeem</button></article>`).join('')||'<p>Belum ada hadiah tersedia.</p>'}
  const {data:history}=await db.from('point_transactions').select('*').eq('user_id',currentUser.id).order('created_at',{ascending:false}).limit(15);
  if($('pointsHistory'))$('pointsHistory').innerHTML=(history||[]).map(h=>`<div class="break-row"><span>${esc(h.description||'Transaksi poin')}<small style="display:block;color:#718099">${new Date(h.created_at).toLocaleDateString('id-ID')}</small></span><b>${Number(h.amount)>0?'+':''}${Number(h.amount)} PTS</b></div>`).join('')||'<p>Riwayat transaksi akan muncul setelah ada poin atau redeem.</p>';
  const {data:myRedemptions}=await db.from('redemptions').select('id,status,points_spent,created_at,rewards(name,is_mystery)').eq('user_id',currentUser.id).order('created_at',{ascending:false}).limit(20);
  if($('myRedemptions'))$('myRedemptions').innerHTML='<h3>Riwayat redeem</h3>'+((myRedemptions||[]).map(r=>`<div class="break-row"><span>${r.rewards?.is_mystery?'Mystery Reward':esc(r.rewards?.name||'Hadiah')}<small style="display:block;color:#718099">${esc(r.status)}</small></span><b>-${r.points_spent} PTS</b></div>`).join('')||'<p>Belum ada permintaan redeem.</p>');
  const {data:feedback}=await db.from('aspiration_feedback').select('id,message,status,created_at,submission_id').eq('student_id',currentUser.id).order('created_at',{ascending:false});
  if($('studentFeedback'))$('studentFeedback').innerHTML=(feedback||[]).map(f=>`<article class="submission-block"><b>${esc(f.status||'Feedback dari PK Inti')}</b><p>${esc(f.message)}</p><small>${new Date(f.created_at).toLocaleString('id-ID')}</small></article>`).join('')||'<p>Belum ada feedback baru dari PK Inti.</p>';
 }catch(e){console.warn('Student extras not ready. Run migration SQL first.',e);}
}
async function requestRedeem(rewardId){if(!confirm('Ajukan penukaran hadiah ini? Poin akan diproses oleh sistem.'))return;try{const {data,error}=await db.rpc('request_reward_redemption',{p_reward_id:rewardId});if(error)throw error;toast('Permintaan redeem berhasil diajukan!');db.functions.invoke('push-redeem-notification',{body:{}}).catch(()=>{});await loadMe();renderStudent();await loadStudentExtras();}catch(e){toast('Redeem belum tersedia: '+(e.message||'periksa setup database'));}}
async function adminExtraLoad(){
 try{
  const {data:profiles}=await db.from('profiles').select('id,username,class_name,attendance_no,points,role').eq('role','student').order('username');
  const accounts=$('adminAccounts');if(accounts)accounts.innerHTML=(profiles||[]).map(p=>`<div class="break-row account-row" data-search="${esc((p.username+' '+p.class_name+' '+p.attendance_no).toLowerCase())}"><span><b>${esc(p.username)}</b><small style="display:block;color:#718099">${esc(p.class_name)} · Absen ${esc(p.attendance_no)}</small></span><span>${Number(p.points||0)} PTS <button onclick="deleteStudentAccount('${p.id}','${esc(p.username)}')">Hapus</button></span></div>`).join('')||'<p>Tidak ada akun siswa.</p>';
  const {data:rewards}=await db.from('rewards').select('*').order('points_cost');if($('adminRewards'))$('adminRewards').innerHTML=(rewards||[]).map(r=>`<div class="break-row"><span>${r.is_mystery?'Mystery Reward':esc(r.name)} · ${r.points_cost} pts <small style="display:block;color:#718099">stok <input id="stock-${r.id}" type="number" min="0" value="${r.stock}" style="width:70px;padding:5px;border:1px solid #ddd;border-radius:7px"><button onclick="saveRewardStock('${r.id}')">Simpan stok</button></small></span><button onclick="setRewardActive('${r.id}',${!r.active})">${r.active?'Nonaktifkan':'Aktifkan'}</button></div>`).join('');
  const {data:redemptions}=await db.from('redemptions').select('id,user_id,status,points_spent,created_at,rewards(name,is_mystery)').order('created_at',{ascending:false}).limit(100);
  const {data:profiles2}=await db.from('profiles').select('id,username,class_name,attendance_no');const pm=Object.fromEntries((profiles2||[]).map(x=>[x.id,x]));
  if($('adminRedemptions'))$('adminRedemptions').innerHTML=(redemptions||[]).map(r=>`<div class="break-row"><span><b>${esc(pm[r.user_id]?.username||'Siswa')}</b> · ${r.rewards?.is_mystery?'Mystery Reward':esc(r.rewards?.name||'Hadiah')} · ${r.points_spent} pts<small style="display:block;color:#718099">${esc(r.status)}</small></span><select onchange="updateRedemption('${r.id}',this.value)"><option ${r.status==='pending'?'selected':''} value="pending">Menunggu</option><option ${r.status==='approved'?'selected':''} value="approved">Disetujui</option><option ${r.status==='ready'?'selected':''} value="ready">Siap diambil</option><option ${r.status==='completed'?'selected':''} value="completed">Selesai</option><option ${r.status==='rejected'?'selected':''} value="rejected">Ditolak</option></select></div>`).join('')||'<p>Belum ada redeem.</p>';
  const {data:subs}=await db.from('submissions').select('id,user_id,mission_id,school_category,answers,created_at').order('created_at',{ascending:false}).limit(60);
  if($('adminFeedbackList'))$('adminFeedbackList').innerHTML=(subs||[]).map(s=>`<div class="submission-block"><b>${esc(pm[s.user_id]?.username||'Siswa')} · ${esc(s.school_category||'Aspirasi')}</b><p>${esc((s.answers?.responses||[]).map(x=>x.answer).filter(Boolean).join(' ').slice(0,220))}</p><textarea class="input" id="fb-${s.id}" placeholder="Tulis feedback untuk siswa"></textarea><select id="status-${s.id}"><option>Diterima</option><option>Sedang Ditinjau</option><option>Dalam Proses</option><option>Selesai</option></select><button onclick="sendFeedback('${s.id}','${s.user_id}')">Kirim feedback</button></div>`).join('')||'<p>Belum ada aspirasi.</p>';
  const {data:settings}=await db.from('redeem_settings').select('*').eq('id',1).maybeSingle();if(settings){if($('redeemStart')&&settings.starts_at)$('redeemStart').value=settings.starts_at.slice(0,10);if($('redeemEnd')&&settings.ends_at)$('redeemEnd').value=settings.ends_at.slice(0,10);}
 }catch(e){console.warn('Admin extras not ready. Run migration SQL first.',e);}
}
function filterAccounts(){const q=($('accountSearch')?.value||'').toLowerCase();document.querySelectorAll('.account-row').forEach(x=>x.style.display=x.dataset.search.includes(q)?'flex':'none')}
async function addReward(){const name=$('rewardName').value.trim(),cost=Number($('rewardPoints').value),stock=Number($('rewardStock').value),mystery=$('rewardMystery').value==='true';if(!name||cost<1||stock<0)return toast('Isi nama, harga poin, dan stok dengan benar.');const {error}=await db.from('rewards').insert({name,points_cost:cost,stock,is_mystery:mystery,active:true});if(error)return toast(error.message);$('rewardName').value='';await adminExtraLoad()}
async function saveRewardStock(id){const stock=Number($('stock-'+id).value);if(!Number.isInteger(stock)||stock<0)return toast('Stok harus bilangan bulat minimal 0.');const {error}=await db.from('rewards').update({stock}).eq('id',id);if(error)return toast(error.message);toast('Stok disimpan');await adminExtraLoad()}
async function setRewardActive(id,active){const {error}=await db.from('rewards').update({active}).eq('id',id);if(error)return toast(error.message);await adminExtraLoad()}
async function updateRedemption(id,status){const {error}=await db.rpc('admin_update_redemption_status',{p_redemption_id:id,p_status:status});if(error)toast(error.message);else{toast('Status redeem diperbarui');await adminExtraLoad()}}
async function sendFeedback(submissionId,studentId){const message=$('fb-'+submissionId).value.trim(),status=$('status-'+submissionId).value;if(!message)return toast('Tulis feedback dulu.');const {error}=await db.from('aspiration_feedback').insert({submission_id:submissionId,student_id:studentId,message,status,admin_id:currentUser.id});if(error)return toast(error.message);toast('Feedback terkirim');await adminExtraLoad()}
async function saveRedeemWindow(){const starts=$('redeemStart').value,ends=$('redeemEnd').value;if(!starts||!ends||ends<starts)return toast('Tanggal periode belum benar.');const {error}=await db.from('redeem_settings').upsert({id:1,starts_at:new Date(starts+'T00:00:00').toISOString(),ends_at:new Date(ends+'T23:59:59').toISOString(),is_open:true,updated_by:currentUser.id});if(error)return toast(error.message);toast('Periode redeem disimpan');await adminExtraLoad()}
async function toggleRedeemWindow(isOpen){const payload=isOpen?{id:1,is_open:true,starts_at:new Date().toISOString(),ends_at:null,updated_by:currentUser.id}:{id:1,is_open:false,updated_by:currentUser.id};const {error}=await db.from('redeem_settings').upsert(payload);if(error)return toast(error.message);toast(isOpen?'Redeem dibuka':'Redeem ditutup');await adminExtraLoad()}
async function deleteStudentAccount(id,username){if(!confirm(`Hapus akun ${username}? Tindakan ini permanen dan memerlukan fungsi admin server-side.`))return;try{const {data,error}=await db.functions.invoke('admin-delete-student',{body:{user_id:id}});if(error)throw error;toast('Akun dihapus');await loadAdmin();await adminExtraLoad()}catch(e){toast('Penghapusan butuh Edge Function admin-delete-student: '+e.message)}}

if(document.body.dataset.page==='index')bootIndex();
if(document.body.dataset.page==='student')bootStudent();
if(document.body.dataset.page==='admin')bootAdmin();
