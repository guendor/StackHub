'use client';
import { useState } from 'react';
import { Input, Label, Button, Card } from '@/components/ui';
import { signup } from '@/lib/auth';
import { uuid } from '@/lib/storage';


export default function Page(){
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [whatsapp,setWhatsapp]=useState('');
const [password,setPassword]=useState('');
const [role,setRole]=useState<'Jogador'|'Investidor'>('Investidor');
const [error,setError]=useState<string|null>(null);


const submit=(e:React.FormEvent)=>{
e.preventDefault(); setError(null);
const res = signup({ name,email,whatsapp,role,password }, uuid);
if(('error' in (res as any))) { setError((res as any).error); return; }
location.href = '/';
};


return (
<div className="max-w-md mx-auto mt-10">
<Card>
<h2 className="text-2xl font-bold mb-2">Criar conta</h2>
<p className="text-sm text-gray-600 mb-2">Senha: 8+ caracteres, 1 maiúscula, 1 número e 1 especial.</p>
<form onSubmit={submit} className="space-y-3">
<div><Label>Nome completo</Label><Input value={name} onChange={e=>setName(e.target.value)} required/></div>
<div><Label>E-mail</Label><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
<div><Label>WhatsApp (com DDI)</Label><Input value={whatsapp} onChange={e=>setWhatsapp(e.target.value)} placeholder="554899999999" required/></div>
<div><Label>Senha</Label><Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>{error&&<p className="text-xs text-red-600 mt-1">{error}</p>}</div>
<div><Label>Papel</Label><div className="grid grid-cols-2 gap-2 mt-1">{['Jogador','Investidor'].map(r=>(<button type="button" key={r} onClick={()=>setRole(r as any)} className={"border rounded-xl px-3 py-2 text-sm "+(role===r?" bg-orange-50 border-orange-400":" hover:bg-gray-50")}>{r}</button>))}</div></div>
<Button className="w-full">Criar conta</Button>
</form>
</Card>
</div>
);
}