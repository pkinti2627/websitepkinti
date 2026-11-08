import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const cors = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' };
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });
  if (req.method !== 'POST') return new Response(JSON.stringify({error:'Method not allowed'}), {status:405,headers:{...cors,'Content-Type':'application/json'}});
  try {
    const url = Deno.env.get('SUPABASE_URL')!;
    const anon = Deno.env.get('SUPABASE_ANON_KEY')!;
    const service = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const authHeader = req.headers.get('Authorization') || '';
    const caller = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: { user }, error: authError } = await caller.auth.getUser();
    if (authError || !user) return new Response(JSON.stringify({error:'Unauthorized'}), {status:401,headers:{...cors,'Content-Type':'application/json'}});
    const { data: profile } = await caller.from('profiles').select('role').eq('id',user.id).single();
    if (profile?.role !== 'pk_admin') return new Response(JSON.stringify({error:'PK Inti only'}), {status:403,headers:{...cors,'Content-Type':'application/json'}});
    const { user_id } = await req.json();
    if (!user_id || user_id === user.id) return new Response(JSON.stringify({error:'Target account invalid'}), {status:400,headers:{...cors,'Content-Type':'application/json'}});
    const admin = createClient(url, service);
    const { data: target } = await admin.from('profiles').select('role').eq('id',user_id).maybeSingle();
    if (!target || target.role !== 'student') return new Response(JSON.stringify({error:'Only student accounts can be deleted'}), {status:400,headers:{...cors,'Content-Type':'application/json'}});
    const { error } = await admin.auth.admin.deleteUser(user_id);
    if (error) throw error;
    return new Response(JSON.stringify({ok:true}), {status:200,headers:{...cors,'Content-Type':'application/json'}});
  } catch (e) { return new Response(JSON.stringify({error:String(e?.message || e)}), {status:500,headers:{...cors,'Content-Type':'application/json'}}); }
});
