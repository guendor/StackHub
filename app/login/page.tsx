'use client';
import { useState } from 'react';
import { Input, Label, Button, Card } from '@/components/ui';
import { login } from '@/lib/auth';


export default function Page(){
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [remember,setRemember]=useState(true);
const [error,setError]=useState<string|null>(null);


const submit=(e:React.FormEvent)=>{
e.preventDefault(); setError(null);
const res = login(email,password);
if(('error' in (res as any))) { setError((res as any).error); return; }
if(!remember) {/* no-op demo */}
location.href = '/';
};


return (
<div className="max-w-md mx-auto mt-10">
<Card>
<h2 className="text-2xl font-bold mb-2">Entrar</h2>
<form onSubmit={submit} className="space-y-3">
<div><Label>E-mail</Label><Input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
<div><Label>Senha</Label><Input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>{error&&<p className="text-xs text-red-600 mt-1">{error}</p>}</div>
<div className="flex items-center gap-2"><input id="remember" type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/><label htmlFor="remember" className="text-sm">Lembrar login</label></div>
<Button className="w-full">Entrar</Button>
</form>
</Card>
</div>
);
}