'use client';
import { useState } from 'react';
import { Card, Button, Input } from '@/components/ui';
import { LS_KEYS, Threads, Interest, Listing, User } from '@/lib/models';
import { load, save } from '@/lib/storage';
import { currentUser } from '@/lib/auth';


export default function Page({ params }:{ params:{ interestId: string } }){
const u = currentUser();
if(!u) return <div className="max-w-3xl mx-auto mt-6"><Card>Faça login para acessar o chat.</Card></div>;
const all = load<Threads>(LS_KEYS.messages, {});
const thread = all[params.interestId] || [];
const interests = load<Interest[]>(LS_KEYS.interests, []);
const it = interests.find(i=>i.id===params.interestId);
const listing = load<Listing[]>(LS_KEYS.listings, []).find(l=>l.id===it?.listingId);
const canChat = it?.status==='ACCEPTED';
const [text,setText]=useState('');


const send=(e:React.FormEvent)=>{
e.preventDefault(); if(!canChat){ alert('Chat disponível somente após confirmação.'); return; }
if(!text.trim()) return; const msg={ id: crypto.randomUUID?.()||String(Date.now()), senderId:u.id, text:text.trim(), ts:Date.now() };
const updated={...all, [params.interestId]:[...thread, msg]}; save(LS_KEYS.messages, updated); setText('');
};


return (
<div className="max-w-3xl mx-auto mt-6">
<Card>
<h2 className="text-xl font-bold mb-2">Chat da oferta</h2>
<p className="text-sm text-gray-600 mb-3">{listing?.tournament} · {listing?.location||''}</p>
<div className="space-y-2 max-h-[380px] overflow-auto border rounded-lg p-3">
{thread.length===0 && <p className="text-sm text-gray-500">Nenhuma mensagem ainda.</p>}
{thread.map(m=> (
<div key={m.id} className={"flex "+(m.senderId===u.id?"justify-end":"justify-start")}>
<div className={"px-3 py-2 rounded-xl max-w-[75%] "+(m.senderId===u.id?"bg-orange-100":"bg-gray-100") }>
<div className="text-xs text-gray-500">{new Date(m.ts).toLocaleString()}</div>
<div className="text-sm">{m.text}</div>
</div>
</div>
))}
</div>
<form onSubmit={send} className="mt-3 flex gap-2">
<Input value={text} onChange={e=>setText(e.target.value)} placeholder={canChat?"Escreva sua mensagem...":"Aguardando confirmação..."} disabled={!canChat}/>
<Button disabled={!canChat}>Enviar</Button>
</form>
</Card>
</div>
);
}
