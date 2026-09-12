const SUPABASE_URL = 'https://fxvedprgoftcounrdjsv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_vS9bGCJfA-oZQMzCKP3sJQ__bwznLQq';
const { createClient } = supabase;
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
{q:'Pernah ada situasi yang membuatmu ingin menyampaikan aspirasi melalui PK? Ceritakan jika ada.',type:'text',placeholder:'Tidak perlu formal. Ceritakan singkat saja...'}],
'Fasilitas & Lingkungan':[
{q:'Fasilitas apa yang menurutmu paling perlu mendapat perhatian?',type:'choice',options:['Ruang kelas','Toilet','Area kantin dan makan','Tempat duduk / area istirahat','Sarana olahraga']},
{q:'Area sekolah mana yang paling sering kamu gunakan dan perlu dibuat lebih nyaman?',type:'choice',options:['Kelas','Kantin','Lapangan / area olahraga','Koridor / area tunggu','Perpustakaan']},
{q:'Seberapa sering kamu menemukan fasilitas sekolah yang kurang nyaman digunakan?',type:'scale',options:['1 — Tidak pernah','2 — Jarang','3 — Sesekali','4 — Sering','5 — Hampir setiap hari']},
{q:'Perbaikan seperti apa yang menurutmu paling terasa manfaatnya?',type:'choice',options:['Menambah atau memperbaiki fasilitas','Meningkatkan kebersihan','Menata ulang ruang atau area','Membuat fasilitas lebih mudah digunakan']},
{q:'Kalau ada satu fasilitas yang ingin kamu ubah atau tambahkan, apa itu dan kenapa?',type:'text',placeholder:'Tulis detailnya...'}],
'Akademik & Pembelajaran':[
{q:'Bagian dari proses belajar apa yang menurutmu paling perlu dikembangkan?',type:'choice',options:['Metode pembelajaran di kelas','Pengelolaan tugas','Materi dan penjelasan','Kegiatan praktik / proyek','Persiapan ujian']},
{q:'Cara belajar seperti apa yang paling membantu kamu memahami materi?',type:'choice',options:['Penjelasan langsung dari guru','Contoh soal dan latihan','Diskusi kelompok','Praktik atau proyek','Media visual / digital']},
{q:'Seberapa sering beban tugas terasa sulit untuk dikelola?',type:'scale',options:['1 — Hampir tidak pernah','2 — Jarang','3 — Kadang-kadang','4 — Sering','5 — Sangat sering']},
{q:'Dukungan akademik apa yang paling ingin kamu dapatkan ketika mengalami kesulitan?',type:'choice',options:['Waktu konsultasi tambahan','Penjelasan ulang materi','Latihan tambahan','Materi atau rangkuman belajar','Pendampingan belajar']},
{q:'Apa satu hal dalam pengalaman belajar di sekolah yang menurutmu perlu diperbaiki?',type:'text',placeholder:'Tulis pengalaman atau saranmu...'}],
'Guru & Karyawan':[
{q:'Hal apa dari cara guru atau karyawan membantu siswa yang paling kamu hargai?',type:'choice',options:['Mau mendengarkan siswa','Cepat membantu ketika ada masalah','Memberikan penjelasan yang jelas','Ramah dan mudah diajak berbicara','Memberikan arahan yang membantu']},
{q:'Dalam situasi apa kamu biasanya membutuhkan bantuan guru atau karyawan?',type:'choice',options:['Saat mengalami kesulitan belajar','Saat membutuhkan informasi sekolah','Saat ada masalah dengan teman','Saat mengikuti kegiatan sekolah','Saat membutuhkan arahan atau bantuan lainnya']},
{q:'Kalau membutuhkan bantuan, cara komunikasi seperti apa yang paling membuatmu nyaman?',type:'choice',options:['Berbicara langsung','Chat / pesan','Melalui wali kelas atau guru tertentu','Melalui layanan sekolah']},
{q:'Seberapa puas kamu dengan bantuan yang diberikan guru atau karyawan ketika kamu membutuhkannya?',type:'scale',options:['1 — Sangat tidak puas','2 — Tidak puas','3 — Cukup puas','4 — Puas','5 — Sangat puas']},
{q:'Apa yang menurutmu bisa ditingkatkan dari cara guru atau karyawan membantu siswa?',type:'text',placeholder:'Tulis dengan jujur dan tetap sopan...'}],
'Kehidupan Siswa':[
{q:'Bagian dari kehidupan siswa di sekolah apa yang paling ingin kamu kembangkan?',type:'choice',options:['Kegiatan dan organisasi siswa','Relasi antar siswa','Kenyamanan suasana sekolah','Kesempatan menyampaikan pendapat','Kegiatan sosial dan kebersamaan']},
{q:'Hal apa yang paling memengaruhi kenyamananmu sebagai siswa di sekolah?',type:'choice',options:['Lingkungan yang aman dan nyaman','Hubungan dengan teman','Hubungan dengan guru','Kegiatan sekolah','Kesempatan untuk didengar']},
{q:'Dukungan apa yang paling kamu butuhkan sebagai siswa?',type:'choice',options:['Ruang untuk menyampaikan aspirasi','Kegiatan yang lebih beragam','Pendampingan ketika ada masalah','Informasi sekolah yang lebih jelas','Kesempatan berkolaborasi dengan siswa lain']},
{q:'Bagaimana kamu paling nyaman menyampaikan pendapat tentang kehidupan siswa?',type:'choice',options:['Form online seperti Aspiroom','Forum kelas','Diskusi langsung','Melalui PK / perwakilan siswa']},
{q:'Apa pengalaman atau hal di kehidupan sekolah yang ingin kamu lihat menjadi lebih baik?',type:'text',placeholder:'Ceritakan secara bebas...'}]};

let currentUser=null, currentScore=0, type='', pts=0, area='', selected={};
const $=id=>document.getElementById(id);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function toast(t){const x=$('toast');if(!x)return;x.textContent=t;x.classList.add('on');setTimeout(()=>x.classList.remove('on'),2300)}
function confetti(){for(let i=0;i<34;i++){const c=document.createElement('i');c.className='confetti';c.style.left=Math.random()*100+'vw';c.style.animationDelay=(Math.random()*.25)+'s';document.body.appendChild(c);setTimeout(()=>c.remove(),1800)}}
function speakGuide(text, mood='talk'){const box=$('guideBubble'),img=$('guideImg');if(!box)return;showGuide();box.classList.remove('show');if(img)img.classList.remove('bounce','wave');setTimeout(()=>{box.textContent=text;box.classList.add('show');if(img)img.classList.add(mood==='wave'?'wave':'bounce')},90)}
function hideGuide(){const g=$('guide');if(g)g.classList.remove('show')}
function showGuide(){const g=$('guide');if(g)g.classList.add('show')}
function openLogin(){ $('opening')?.classList.add('hidden'); $('loginScreen')?.classList.remove('hidden'); speakGuide('👋 Hai! Selamat datang di Aspiroom. Di sini kamu bisa menyampaikan pendapat, ide, dan masukan tentang sekolah. Yuk, mulai!');}
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
function setBusy(on,label){document.querySelectorAll('button').forEach(b=>{if(b.dataset.keep!=='1')b.disabled=on});const x=$('loginSubmit');if(x&&!on)x.textContent='ENTER ASPIROOM ✦';if(x&&on)x.textContent=label||'Loading...'}
function authError(e){if(/Invalid login credentials/i.test(e.message))return'Username atau password salah.';if(/Email not confirmed/i.test(e.message))return'Email confirmation masih aktif di Supabase. Matikan konfirmasi email dulu.';return e.message}
function togglePassword(id,cb){const el=$(id);if(el)el.type=cb.checked?'text':'password'}
async function loadMe(){const {data:{user}}=await db.auth.getUser();if(!user)throw new Error('Belum login.');const {data:p,error}=await db.from('profiles').select('id,username,class_name,attendance_no,role,points').eq('id',user.id).single();if(error)throw error;currentUser={...p,email:user.email};currentScore=Number(p.points||0);return currentUser}
function goStudent(){location.href='student.html'}
function goAdmin(){location.href='admin.html'}
async function bootIndex(){if(!$('loginScreen'))return;const {data:{session}}=await db.auth.getSession();if(session){try{await loadMe();location.href=currentUser.role==='pk_admin'?'admin.html':'student.html';return}catch(e){console.warn('Aspiroom session/profile check:',e);await db.auth.signOut();}}}

async function bootStudent(){
 try{
  await loadMe();
  if(currentUser.role!=='student'){ location.href='admin.html'; return; }
  renderStudent();
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
function tutorial(){showGuide();speakGuide('👋 Hai! Selamat datang di Aspiroom. Di sini kamu bisa menyampaikan pendapat, ide, dan masukan tentang sekolah. Yuk, mulai!');const skip=()=>{hideGuide()};const next=()=>{openLogin()};if($('guideNext'))$('guideNext').onclick=next;if($('guideSkip'))$('guideSkip').onclick=skip;if($('guideClose'))$('guideClose').onclick=skip;}
function setupRealtimeStudent(){db.channel('student-profile').on('postgres_changes',{event:'UPDATE',schema:'public',table:'profiles',filter:`id=eq.${currentUser.id}`},payload=>{if(payload.new){currentScore=Number(payload.new.points||0);renderStudent();toast('⚡ Poin kamu baru saja diperbarui!')}}).subscribe();}
function toggleProfile(){const m=$('profileMenu');m.classList.toggle('open')}
async function logout(){await db.auth.signOut();location.href='index.html'}
function showProfile(){toggleProfile();alert(`Profile\n${currentUser.username}\n${currentUser.class_name} · Absen ${currentUser.attendance_no}\n\n${currentScore} PTS`)}
function openMission(t,p){type=t;pts=p;area='';selected={};showModal();$('pickView').classList.add('hidden');$('form').classList.remove('hidden');$('ftitle').textContent=t+' · +'+p+' PTS';renderQuestions(data[t]);speakGuide(t==='OSIS'?'Oke, kita mulai dari OSIS! 👀 Jawab sesuai pengalaman kamu ya.':'Gas, masuk ke misi PK! Pendapat kamu bakal dibaca beneran.');}
function openSchool(){type='Sekolah';pts=15;area='';selected={};showModal();$('form').classList.add('hidden');$('pickView').classList.remove('hidden');$('badge').textContent='SCHOOL MISSION · +15 PTS';$('mtitle').textContent='Pilih Area Aspirasi';$('desc').textContent='Masuk ke bagian yang paling sesuai dengan pengalamanmu.';const areas=[['🏢','Fasilitas & Lingkungan'],['📚','Akademik & Pembelajaran'],['🧑‍🏫','Guru & Karyawan'],['💬','Kehidupan Siswa']];$('choices').innerHTML=areas.map((x,i)=>`<button type="button" class="choice school-choice" data-area-index="${i}"><b>${x[0]} ${x[1]}</b><small>Masuk ke section ini →</small></button>`).join('');$('choices').onclick=e=>{const btn=e.target.closest('.school-choice');if(btn)pickArea(areas[Number(btn.dataset.areaIndex)][1])};speakGuide('Sekolah punya 4 area. Pilih yang paling relate sama pengalamanmu.');}
function pickArea(x){area=x;$('pickView').classList.add('hidden');$('form').classList.remove('hidden');$('ftitle').textContent='Sekolah · '+x+' · +15 PTS';renderQuestions(data[x]);speakGuide('Sip. Santai aja, nggak harus panjang. Yang penting jujur dan masuk akal.');}
function renderQuestions(list){selected={};$('questions').innerHTML=list.map((item,i)=>{if(item.type==='text')return `<div class="question">${i+1}. ${item.q}</div><div class="field"><textarea class="input textarea qtext" data-i="${i}" placeholder="${esc(item.placeholder||'Tulis jawabanmu...')}"></textarea></div>`;return `<div class="question">${i+1}. ${item.q}</div><div class="choices question-choices" data-question="${i}">${item.options.map((o,j)=>`<button type="button" class="choice answer-choice" data-question="${i}" data-option="${j}"><b>${esc(o)}</b></button>`).join('')}<button type="button" class="choice answer-choice other-choice" data-question="${i}" data-option="other"><b>Lainnya — isi sendiri</b><small>Tulis jawabanmu sendiri</small></button><div class="other-field hidden" data-other-for="${i}"><input class="input other-input" data-i="${i}" placeholder="Tulis jawabanmu sendiri..."></div></div>`}).join('');$('progressFill').style.width='0%';$('answer').value='';$('questions').onclick=e=>{const btn=e.target.closest('.answer-choice');if(btn)choose(btn,Number(btn.dataset.question))}}
function choose(el,i){el.parentElement.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));el.classList.add('selected');selected[i]=el.dataset.option==='other'?'':el.querySelector('b').innerText;if(el.dataset.option==='other'){const f=el.parentElement.querySelector('.other-field');f.classList.remove('hidden');f.querySelector('input').focus();speakGuide('Lainnya? Boleh banget. Tulis aja jawaban versi kamu.')}else{const f=el.parentElement.querySelector('.other-field');if(f)f.classList.add('hidden')}updateProgress();}
function updateProgress(){const list=data[area||type]||[];let done=0;list.forEach((q,i)=>{if(q.type==='text'){const el=document.querySelector('.qtext[data-i="'+i+'"]');if(el&&el.value.trim())done++}else if(selected[i]||document.querySelector('.other-input[data-i="'+i+'"]')?.value.trim())done++});$('progressFill').style.width=Math.round(done/list.length*100)+'%';if(done===list.length)speakGuide('Dikit lagi! Jangan lupa isi Kritik & Saran di paling bawah ya 👀');}
document.addEventListener('input',e=>{if(e.target.classList.contains('qtext')||e.target.classList.contains('other-input'))updateProgress()});
function showModal(){$('modal').classList.add('show');}
function closeM(){hideGuide();$('modal').classList.remove('show');$('thanks').classList.add('hidden');$('form').classList.add('hidden');$('pickView').classList.remove('hidden')}
function back(){if(type==='Sekolah'&&area){area='';$('form').classList.add('hidden');$('pickView').classList.remove('hidden');speakGuide('Balik ke pilihan area dulu.');}else closeM()}
async function submitM(){
 const list=data[area||type]||[];let answers=[];let missing=false;list.forEach((q,i)=>{if(q.type==='text'){const el=document.querySelector('.qtext[data-i="'+i+'"]');if(!el||!el.value.trim())missing=true;answers.push({question:q.q,type:q.type,answer:el?.value.trim()||''})}else{let val=selected[i];const other=document.querySelector('.other-input[data-i="'+i+'"]');if(!val&&other?.value.trim())val=other.value.trim();if(!val)missing=true;answers.push({question:q.q,type:q.type,answer:val})}});if(missing){toast('Masih ada pertanyaan yang belum dijawab 😭');speakGuide('Eits, masih ada yang kosong. Cek lagi yang belum keisi ya.');return}const critique=$('answer').value.trim();if(!critique){toast('Kritik & Saran wajib diisi.');$('answer').focus();speakGuide('Tinggal satu lagi. Tulis kritik atau saran kamu di bagian bawah ya.');return}
 try{const {data:m,error:me}=await db.from('missions').select('id,points,active').eq('code',type==='Sekolah'?'SEKOLAH':type).eq('active',true).single();if(me)throw me;const payload={user_id:currentUser.id,mission_id:m.id,school_category:area||null,answers:{responses:answers,critique}};const {error}=await db.from('submissions').insert(payload);if(error)throw error;await sleep(350);await loadMe();renderStudent();$('form').classList.add('hidden');$('pickView').classList.add('hidden');$('thanks').classList.remove('hidden');$('earned').textContent='+'+m.points+' PTS ⭐';confetti();speakGuide('🎉 YAY, SELESAI! Terima kasih udah meluangkan waktu. Jawaban kamu sudah masuk ke PK Inti.','wave');}catch(e){toast(e.message||'Gagal mengirim.');}
}
function finishThanks(){closeM();scrollToMissions()}

async function bootAdmin(){
 try{await loadMe();if(currentUser.role!=='pk_admin')return location.href='student.html';await loadAdmin();setupRealtimeAdmin();}catch{location.href='index.html'}
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
function setupRealtimeAdmin(){db.channel('aspiroom-control-room').on('postgres_changes',{event:'*',schema:'public',table:'submissions'},()=>{loadAdmin().catch(()=>{})}).on('postgres_changes',{event:'UPDATE',schema:'public',table:'profiles'},()=>{loadAdmin().catch(()=>{})}).subscribe();}

if(document.body.dataset.page==='index')bootIndex();
if(document.body.dataset.page==='student')bootStudent();
if(document.body.dataset.page==='admin')bootAdmin();
