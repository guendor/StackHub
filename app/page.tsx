'use client';
import { useEffect, useMemo, useState } from 'react';
import { Input, Button, Card, Avatar } from '@/components/ui';
import { LS_KEYS, Listing } from '@/lib/models';
import { load, save } from '@/lib/storage';


export default function Page(){
const [query,setQuery]=useState('');
const [listings,setListings]=useState(load<Listing[]>(LS_KEYS.listings,[]));


useEffect(()=>{
// seed demo
if(listings.length===0){
const demo: Listing = { id: crypto.randomUUID?.()||String(Date.now()), ownerId:'demo1', ownerName:'Tropa', ownerPhoto:null, ownerWhatsapp:'554899999999', tournament:'KSOP Special - Main Event', date:'2025-09-15', location:'Balneário Camboriú', buyin:3500, fee:300, sharesTotal:10, sharesOpen:10, percentPerShare:10, markup:1.2, createdAt:Date.now() };
save(LS_KEYS.listings,[demo]); setListings([demo]);
}
},[]);


const filtered=useMemo(()=>{const q=query.toLowerCase();return listings.filter(l=>[l.tournament,l.location,l.ownerName].some(v=>String(v||'').toLowerCase().includes(q)));},[listings,query]);


return (
<div className="max-w-5xl mx-auto mt-6 p-2">
<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
<h2 className="text-2xl font-bold">Marketplace</h2>
<div className="flex-1"/>
<div className="w-full sm:w-72"><Input placeholder="Buscar por torneio, local, jogador..." value={query} onChange={e=>setQuery(e.target.value)} /></div>
</div>
{filtered.length===0 && (<Card><p className="text-gray-600">Nenhum anúncio encontrado.</p></Card>)}
<div className="grid md:grid-cols-2 gap-4">
{filtered.map(l=>{
const open = l.sharesOpen ?? l.sharesTotal;
return (
<Card key={l.id}>
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-2"><Avatar src={l.ownerPhoto} name={l.ownerName}/><h3 className="font-semibold text-lg">{l.tournament}</h3></div>
<span className="text-xs text-gray-500">{new Date(l.createdAt).toLocaleDateString()}</span>
</div>
<div className="text-sm text-gray-700 space-y-1">
<div><span className="font-medium">Cotas:</span> {open} / {l.sharesTotal} × {l.percentPerShare}%</div>
</div>
<div className="mt-3 flex gap-2 flex-wrap">
<a href={`/manage/${l.id}`}><Button variant="ghost">Gerenciar pedidos</Button></a>
</div>
</Card>
);
})}
</div>
</div>
);
}