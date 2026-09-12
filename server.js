// data model used by the client
const data={
OSIS:[
{q:'Program OSIS seperti apa yang paling ingin kamu lihat?',type:'choice',options:['Kegiatan yang melibatkan banyak kelas','Kegiatan sosial dan pelayanan','Kompetisi atau acara kreatif','Kegiatan yang mendukung pengembangan siswa']},
{q:'Seberapa sering kamu mengetahui informasi tentang kegiatan OSIS?',type:'choice',options:['Hampir selalu','Sering','Kadang-kadang','Jarang']},
{q:'Lewat media apa kamu paling nyaman menerima informasi OSIS?',type:'choice',options:['Instagram / media sosial sekolah','WhatsApp / grup kelas','Pengumuman langsung di sekolah','Poster atau media visual di sekolah']},
{q:'Apa yang menurutmu sudah berjalan baik dari OSIS?',type:'text',placeholder:'Contoh: cara menyampaikan informasi, kegiatan tertentu, dll.'},
{q:'Menurutmu, hal apa yang paling perlu dikembangkan oleh OSIS?',type:'text',placeholder:'Tulis jawabanmu dengan bebas...'}
],
PK:[
{q:'Hal apa yang paling ingin kamu sampaikan melalui PK?',type:'choice',options:['Fasilitas dan lingkungan sekolah','Akademik dan pembelajaran','Kegiatan atau kehidupan siswa','Komunikasi dan penyampaian aspirasi']},
{q:'Cara komunikasi PK mana yang paling nyaman untukmu?',type:'choice',options:['Form aspirasi online','Disampaikan melalui ketua kelas','Berbicara langsung dengan anggota PK','Forum atau diskusi kelas']},
{q:'Seberapa mudah kamu menyampaikan aspirasi kepada PK saat ini?',type:'scale',options:['1 — Sangat sulit','2 — Sulit','3 — Cukup mudah','4 — Mudah','5 — Sangat mudah']},
{q:'Setelah menerima aspirasi, menurutmu PK paling perlu melakukan apa?',type:'choice',options:['Menyampaikan kepada pihak yang berwenang','Membahasnya bersama siswa','Memberikan perkembangan atau kabar balik','Menentukan prioritas masalah yang perlu diperjuangkan']},
{q:'Pernah ada situasi yang membuatmu ingin menyampaikan aspirasi melalui PK? Ceritakan jika ada.',type:'text',placeholder:'Tidak perlu formal. Ceritakan singkat saja...'}
],
'Fasilitas & Lingkungan':[
{q:'Fasilitas apa yang menurutmu paling perlu mendapat perhatian?',type:'choice',options:['Ruang kelas','Toilet','Area kantin dan makan','Tempat duduk / area istirahat','Sarana olahraga']},
{q:'Area sekolah mana yang paling sering kamu gunakan dan perlu dibuat lebih nyaman?',type:'choice',options:['Kelas','Kantin','Lapangan / area olahraga','Koridor / area tunggu','Perpustakaan']},
{q:'Seberapa sering kamu menemukan fasilitas sekolah yang kurang nyaman digunakan?',type:'choice',options:['Hampir setiap hari','Beberapa kali seminggu','Sesekali','Jarang']},
{q:'Perbaikan seperti apa yang menurutmu paling terasa manfaatnya?',type:'choice',options:['Menambah atau memperbaiki fasilitas','Meningkatkan kebersihan','Menata ulang ruang atau area','Membuat fasilitas lebih mudah digunakan']},
{q:'Kalau ada satu fasilitas yang ingin kamu ubah atau tambahkan, apa itu dan kenapa?',type:'text',placeholder:'Tulis detailnya...'}
],
'Akademik & Pembelajaran':[
{q:'Bagian dari proses belajar apa yang menurutmu paling perlu dikembangkan?',type:'choice',options:['Metode pembelajaran di kelas','Pengelolaan tugas','Materi dan penjelasan','Kegiatan praktik / proyek','Persiapan ujian']},
{q:'Cara belajar seperti apa yang paling membantu kamu memahami materi?',type:'choice',options:['Penjelasan langsung dari guru','Contoh soal dan latihan','Diskusi kelompok','Praktik atau proyek','Media visual / digital']},
{q:'Seberapa sering beban tugas terasa sulit untuk dikelola?',type:'choice',options:['Sangat sering','Sering','Kadang-kadang','Jarang','Hampir tidak pernah']},
{q:'Dukungan akademik apa yang paling ingin kamu dapatkan ketika mengalami kesulitan?',type:'choice',options:['Waktu konsultasi tambahan','Penjelasan ulang materi','Latihan tambahan','Materi atau rangkuman belajar','Pendampingan belajar']},
{q:'Apa satu hal dalam pengalaman belajar di sekolah yang menurutmu perlu diperbaiki?',type:'text',placeholder:'Tulis pengalaman atau saranmu...'}
],
'Guru & Karyawan':[
{q:'Hal apa dari cara guru atau karyawan membantu siswa yang paling kamu hargai?',type:'choice',options:['Mau mendengarkan siswa','Cepat membantu ketika ada masalah','Memberikan penjelasan yang jelas','Ramah dan mudah diajak berbicara','Memberikan arahan yang membantu']},
{q:'Dalam situasi apa kamu biasanya membutuhkan bantuan guru atau karyawan?',type:'choice',options:['Saat mengalami kesulitan belajar','Saat membutuhkan informasi sekolah','Saat ada masalah dengan teman','Saat mengikuti kegiatan sekolah','Saat membutuhkan arahan atau bantuan lainnya']},
{q:'Kalau membutuhkan bantuan, cara komunikasi seperti apa yang paling membuatmu nyaman?',type:'choice',options:['Berbicara langsung','Chat / pesan','Melalui wali kelas atau guru tertentu','Melalui layanan sekolah']},
{q:'Seberapa puas kamu dengan bantuan yang diberikan guru atau karyawan ketika kamu membutuhkannya?',type:'scale',options:['1 — Sangat tidak puas','2 — Tidak puas','3 — Cukup puas','4 — Puas','5 — Sangat puas']},
{q:'Apa yang menurutmu bisa ditingkatkan dari cara guru atau karyawan membantu siswa?',type:'text',placeholder:'Tulis dengan jujur dan tetap sopan...'}
],
'Kehidupan Siswa':[
{q:'Bagian dari kehidupan siswa di sekolah apa yang paling ingin kamu kembangkan?',type:'choice',options:['Kegiatan dan organisasi siswa','Relasi antar siswa','Kenyamanan suasana sekolah','Kesempatan menyampaikan pendapat','Kegiatan sosial dan kebersamaan']},
{q:'Hal apa yang paling memengaruhi kenyamananmu sebagai siswa di sekolah?',type:'choice',options:['Lingkungan yang aman dan nyaman','Hubungan dengan teman','Hubungan dengan guru','Kegiatan sekolah','Kesempatan untuk didengar']},
{q:'Dukungan apa yang paling kamu butuhkan sebagai siswa?',type:'choice',options:['Ruang untuk menyampaikan aspirasi','Kegiatan yang lebih beragam','Pendampingan ketika ada masalah','Informasi sekolah yang lebih jelas','Kesempatan berkolaborasi dengan siswa lain']},
{q:'Bagaimana kamu paling nyaman menyampaikan pendapat tentang kehidupan siswa?',type:'choice',options:['Form online seperti Aspiroom','Forum kelas','Diskusi langsung','Melalui PK / perwakilan siswa']},
{q:'Apa pengalaman atau hal di kehidupan sekolah yang ingin kamu lihat menjadi lebih baik?',type:'text',placeholder:'Ceritakan secara bebas...'}
]};

const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const PORT=process.env.PORT||3000;const ROOT=__dirname;const DB=path.join(ROOT,'data','db.json');
fs.mkdirSync(path.dirname(DB),{recursive:true});
const ADMIN_USER=process.env.ASPIROOM_ADMIN_USER||'PKINTI';
const ADMIN_HASH=process.env.ASPIROOM_ADMIN_PASSWORD_SHA256||crypto.createHash('sha256').update(process.env.ASPIROOM_ADMIN_PASSWORD||'PK_26/27').digest('hex');
let db=load();let sessions=new Map();let clients=new Set();
function load(){try{return JSON.parse(fs.readFileSync(DB,'utf8'))}catch{return {students:{},submissions:[]}}}
function save(){fs.writeFileSync(DB,JSON.stringify(db,null,2))}
function hash(s){return crypto.createHash('sha256').update(s).digest('hex')}
function json(res,status,obj){const b=Buffer.from(JSON.stringify(obj));res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Content-Length':b.length,'Cache-Control':'no-store'});res.end(b)}
function body(req){return new Promise((resolve,reject)=>{let s='';req.on('data',c=>{s+=c;if(s.length>1e6)req.destroy()});req.on('end',()=>{try{resolve(s?JSON.parse(s):{})}catch(e){reject(e)}});req.on('error',reject)})}
function cookie(req){const c=req.headers.cookie||'';return Object.fromEntries(c.split(';').map(x=>x.trim().split('=').map(decodeURIComponent)).filter(x=>x.length===2))}
function auth(req){return sessions.get(cookie(req).sid)}
function session(res,user){const sid=crypto.randomBytes(32).toString('hex');sessions.set(sid,user);res.setHeader('Set-Cookie',`sid=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400`)}
function noStore(res){res.setHeader('Cache-Control','no-store')}
function broadcast(){const payload=`data: ${JSON.stringify({type:'update'})}\n\n`;for(const r of clients){try{r.write(payload)}catch{clients.delete(r)}}}
function stats(){const classPoints={};const missionBreakdown={OSIS:0,PK:0,Sekolah:0};for(const s of Object.values(db.students))classPoints[s.kelas]=(classPoints[s.kelas]||0)+Number(s.points||0);for(const x of db.submissions)missionBreakdown[x.mission]=(missionBreakdown[x.mission]||0)+1;return {students:Object.keys(db.students).length,aspirations:db.submissions.length,totalPoints:Object.values(db.students).reduce((a,s)=>a+Number(s.points||0),0),latest:db.submissions.slice(-20).reverse(),missionBreakdown,classPoints}}
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};
const server=http.createServer(async(req,res)=>{try{const u=new URL(req.url,`http://${req.headers.host}`),p=u.pathname;
if(req.method==='GET'&&p==='/api/me'){const a=auth(req);if(!a)return json(res,401,{error:'Not logged in'});return json(res,200,a)}
if(req.method==='POST'&&p==='/api/register'){const b=await body(req),username=String(b.username||'').trim(),key=username.toLowerCase(),password=String(b.password||''),kelas=String(b.kelas||'').trim(),absen=String(b.absen||'').trim();if(!username||!password||!kelas||!absen)return json(res,400,{error:'Semua data wajib diisi.'});if(username.length<2||username.length>30)return json(res,400,{error:'Username harus 2–30 karakter.'});if(key===ADMIN_USER.toLowerCase()||db.students[key])return json(res,409,{error:'Username sudah digunakan.'});db.students[key]={username,kelas,absen,passwordHash:hash(password),points:0,createdAt:new Date().toISOString()};save();session(res,{role:'student',username,kelas,absen,points:0});broadcast();return json(res,201,{ok:true})}
if(req.method==='POST'&&p==='/api/login/student'){const b=await body(req),key=String(b.username||'').trim().toLowerCase(),s=db.students[key];if(!s||s.passwordHash!==hash(String(b.password||'')))return json(res,401,{error:'Username atau password salah.'});session(res,{role:'student',username:s.username,kelas:s.kelas,absen:s.absen,points:s.points});return json(res,200,{ok:true})}
if(req.method==='POST'&&p==='/api/login/admin'){const b=await body(req);if(String(b.username||'').trim()!==ADMIN_USER||hash(String(b.password||''))!==ADMIN_HASH)return json(res,401,{error:'Username atau password PK Inti salah.'});session(res,{role:'admin',username:ADMIN_USER});return json(res,200,{ok:true})}
if(req.method==='POST'&&p==='/api/logout'){const sid=cookie(req).sid;if(sid)sessions.delete(sid);res.setHeader('Set-Cookie','sid=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0');return json(res,200,{ok:true})}
if(req.method==='POST'&&p==='/api/submissions'){const a=auth(req);if(!a||a.role!=='student')return json(res,401,{error:'Silakan login sebagai siswa.'});const b=await body(req),mission=String(b.mission||''),area=b.area?String(b.area):'',answers=Array.isArray(b.answers)?b.answers:[],critique=String(b.critique||'').trim();const points=mission==='Sekolah'?15:10;if(!['OSIS','PK','Sekolah'].includes(mission)||!critique)return json(res,400,{error:'Data aspirasi belum lengkap.'});const key=a.username.toLowerCase(),s=db.students[key];if(!s)return json(res,401,{error:'Akun tidak ditemukan.'});const item={id:crypto.randomUUID(),username:s.username,kelas:s.kelas,absen:s.absen,mission,area,answers,critique,points,createdAt:new Date().toISOString()};db.submissions.push(item);s.points=Number(s.points||0)+points;save();sessions.set(cookie(req).sid,{role:'student',username:s.username,kelas:s.kelas,absen:s.absen,points:s.points});broadcast();return json(res,201,{ok:true,pointsAdded:points,totalPoints:s.points})}
if(req.method==='GET'&&p==='/api/admin/stats'){const a=auth(req);if(!a||a.role!=='admin')return json(res,403,{error:'Admin access required'});return json(res,200,stats())}
if(req.method==='GET'&&p==='/api/events'){const a=auth(req);if(!a||a.role!=='admin')return json(res,403,{error:'Admin access required'});res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive','X-Accel-Buffering':'no'});res.write('data: '+JSON.stringify({type:'connected'})+'\n\n');clients.add(res);req.on('close',()=>clients.delete(res));return}
if(req.method==='GET'&&p==='/api/health')return json(res,200,{ok:true});
let file=p==='/'?'/index.html':p;if(file==='/favicon.ico'){res.writeHead(204);return res.end()}const fp=path.join(ROOT,file);if(!fp.startsWith(ROOT)||!fs.existsSync(fp)||fs.statSync(fp).isDirectory())return json(res,404,{error:'Not found'});const ext=path.extname(fp);res.writeHead(200,{'Content-Type':mime[ext]||'text/plain; charset=utf-8'});fs.createReadStream(fp).pipe(res);
}catch(e){console.error(e);json(res,500,{error:'Server error'})}});
server.listen(PORT,()=>console.log(`Aspiroom running on http://localhost:${PORT}`));
