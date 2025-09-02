'use client';
import { useState } from 'react';
import { Input, Label, Button, Card, Avatar } from '@/components/ui';
import { LS_KEYS, User } from '@/lib/models';
import { load, save } from '@/lib/storage';


export default function Page(){
const u = load<User|null>(LS_KEYS.user, null);
if(!u) return <div className="max-w-3xl mx-auto mt-6"><Card>Faça login para acessar o perfil.</Card></div>;
const [draft,setDraft]=useState<User>({...u});
const titlesKey = `${LS_KEYS.titles}:${u.id}`;
const [titles,setTitles]=useState<any[]>(load<any[]>(titlesKey, []));
const [t,setT]=useState({ tournament:'', placement:'', prize:'', date:'' });


const saveProfile=()=>{ save(LS_KEYS.user, draft); alert('Perfil atualizado!'); };
const addTitle=()=>{ if(!t.tournament||!t.placement||!t.date) return alert('Preencha torneio, colocação e data.'); const novo={ id: crypto.randomUUID?.()||String(Date.now()), ...t }; const upd=[...titles, novo]; setTitles(upd); save(titlesKey, upd); setT({ tournament:'', placement:'', prize:'', date:'' }); };
const removeTitle=(id:string)=>{ const upd=titles.filter(x=>x.id!==id); setTitles(upd); save(titlesKey, upd); };
const handlePhotoUpload=(e:any)=>{ const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=(ev:any)=>setDraft(d=>({...d, photo: ev.target.result})); r.readAsDataURL(f); };


return (
<div className="max-w-3xl mx-auto mt-6">
<Card>
<h2 className="text-xl font-bold mb-1">Meu Perfil</h2>
<div className="flex items-center gap-4 mb-6">
<Avatar src={draft.photo} name={draft.name} size={96} />
<div><Label>Foto de perfil</Label><input type="file" accept="image/*" onChange={handlePhotoUpload}/></div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div><Label>Nome</Label><Input value={draft.name} onChange={e=>setDraft(d=>({...d,name:e.target.value}))}/></div>
<div><Label>E-mail</Label><Input value={draft.email} onChange={e=>setDraft(d=>({...d,email:e.target.value}))}/></div>
<div><Label>WhatsApp (DDI)</Label><Input value={draft.whatsapp} onChange={e=>setDraft(d=>({...d,whatsapp:e.target.value.replace(/\D/g,'')}))}/></div>
<div><Label>Papel</Label><Input value={draft.role} disabled/></div>
</div>
<div className="mt-6">
<h3 className="font-semibold mb-2">Títulos</h3>
<div className="grid grid-cols-1 md:grid-cols-4 gap-3">
<div><Label>Torneio</Label><Input value={t.tournament} onChange={e=>setT({...t,tournament:e.target.value})}/></div>
<div><Label>Colocação</Label><Input value={t.placement} onChange={e=>setT({...t,placement:e.target.value})}/></div>
<div><Label>Prêmio</Label><Input value={t.prize} onChange={e=>setT({...t,prize:e.target.value})}/></div>
<div><Label>Data</Label><Input type="date" value={t.date} onChange={e=>setT({...t,date:e.target.value})}/></div>
</div>
<div className="mt-2"><Button onClick={addTitle}>Adicionar título</Button></div>
<div className="mt-4 space-y-2">
{titles.length===0 && <p className="text-sm text-gray-600">Nenhum título cadastrado ainda.</p>}
{titles.map(item=> (
<Card key={item.id} className="flex items-center justify-between">
<div className="text-sm"><div className="font-medium">{item.tournament}</div><div className="text-gray-600">{item.placement} · {item.prize||'—'} · {item.date}</div></div>
<Button variant="ghost" onClick={()=>removeTitle(item.id)}>Remover</Button>
</Card>
))}
</div>
</div>
<div className="mt-6 flex gap-2"><Button onClick={saveProfile}>Salvar alterações</Button></div>
</Card>
</div>
);
}