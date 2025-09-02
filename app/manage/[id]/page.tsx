'use client';
import { useEffect, useState } from 'react';
import { Card, Button } from '@/components/ui';
import { LS_KEYS, Interest, Listing } from '@/lib/models';
import { load, save } from '@/lib/storage';


export default function Page({ params }:{ params:{ id: string } }){
const [listings,setListings]=useState(load<Listing[]>(LS_KEYS.listings,[]));
const [interests,setInterests]=useState(load<Interest[]>(LS_KEYS.interests,[]));
const l = listings.find(x=>x.id===params.id);
if(!l) return <div className="max-w-3xl mx-auto mt-6"><Card>Anúncio não encontrado.</Card></div>;


const setBoth=(nl:Listing[], ni:Interest[])=>{ save(LS_KEYS.listings,nl); setListings(nl); save(LS_KEYS.interests,ni); setInterests(ni); };
const accept=(interestId:string)=>{
const freshListings=load<Listing[]>(LS_KEYS.listings,[]);
const lf=freshListings.find(x=>x.id===params.id); const i=interests.find(x=>x.id===interestId);
if(!lf||!i) return; const curr=lf.sharesOpen ?? lf.sharesTotal; if(i.qty>curr){ alert('As cotas mudaram e não há disponibilidade suficiente.'); return; }
const nl=freshListings.map(x=>x.id!==lf.id?x:{...x,sharesOpen:Math.max(0,curr - i.qty)});
const ni=interests.map(x=>x.id!==i.id?x:{...x,status:'ACCEPTED'});
setBoth(nl,ni); alert('Reserva aceita. Chat e WhatsApp liberados.');
};
const decline=(interestId:string)=>{ const ni=interests.map(x=>x.id!==interestId?x:{...x,status:'DECLINED'}); save(LS_KEYS.interests,ni); setInterests(ni); };
const related=interests.filter(i=>i.listingId===params.id).sort((a,b)=>b.createdAt-a.createdAt);


return (
<div className="max-w-3xl mx-auto mt-6">
<Card>
<h2 className="text-xl font-bold mb-2">Pedidos de reserva</h2>
<p className="text-sm text-gray-600 mb-3">{l.tournament} — Cotas abertas: {l.sharesOpen ?? l.sharesTotal}/{l.sharesTotal}</p>
{related.length===0 && <p className="text-sm text-gray-600">Nenhum pedido por enquanto.</p>}
<div className="space-y-2">
{related.map(r=> (
<Card key={r.id} className="bg-gray-50">
<div className="flex items-center justify-between">
<div>
<div className="font-medium text-sm">{r.qty} cota(s) — {r.status}</div>
<div className="text-xs text-gray-600">Mensagem: {r.msg||'—'}</div>
</div>
<div className="flex gap-2">
{r.status==='PENDING' && <Button onClick={()=>accept(r.id)}>Aceitar</Button>}
{r.status==='PENDING' && <Button variant="ghost" onClick={()=>decline(r.id)}>Recusar</Button>}
{r.status==='ACCEPTED' && <a href={`/chat/${r.id}`}><Button variant="secondary">Abrir chat</Button></a>}
</div>
</div>
</Card>
))}
</div>
</Card>
</div>
);
}