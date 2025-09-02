'use client';
import { useMemo, useState } from 'react';
import { Input, Label, Button, Card } from '@/components/ui';
import { LS_KEYS, Listing } from '@/lib/models';
import { load, save } from '@/lib/storage';


export default function Page(){
const u = load(LS_KEYS.user, null);
if (!u || u.role!=='Jogador') return <div className="max-w-3xl mx-auto mt-6"><Card>Área restrita ao Jogador.</Card></div>;


const [form,setForm]=useState({tournament:"",date:"",location:"",buyin:0,addon:0,fee:0,guaranteed:"",sharesTotal:10,percentPerShare:10,markup:1.0});
const totalCost=useMemo(()=>{const b=Number(form.buyin||0),a=Number(form.addon||0),f=Number(form.fee||0),m=Number(form.markup||1);return (b+a+f)*(m||1);},[form]);
const pricePerShare=useMemo(()=>{const shares=Number(form.sharesTotal||0),pct=Number(form.percentPerShare||0); if(!shares||!pct) return 0; const totalPct=shares*pct; return totalPct ? (totalCost*(pct/100)) : 0;},[form,totalCost]);


const handleSave=(e:React.FormEvent)=>{e.preventDefault();const current=load<Listing[]>(LS_KEYS.listings,[]);const listing: Listing={id: crypto.randomUUID?.()||String(Date.now()),ownerId:u.id,ownerName:u.name,ownerPhoto:u.photo||null,ownerWhatsapp:u.whatsapp,tournament:String(form.tournament||'Torneio'),date:form.date||undefined,location:form.location||undefined,buyin:Number(form.buyin||0),addon:Number(form.addon||0)||undefined,fee:Number(form.fee||0)||undefined,guaranteed:form.guaranteed||undefined,sharesTotal:Number(form.sharesTotal||0),sharesOpen:Number(form.sharesTotal||0),percentPerShare:Number(form.percentPerShare||0),markup:Number(form.markup||1)||undefined,createdAt:Date.now()}; current.unshift(listing); save(LS_KEYS.listings,current); alert('Anúncio publicado!'); location.href='/';};


return(
<div className="max-w-2xl mx-auto mt-6">
<Card>
<h2 className="text-xl font-bold mb-1">Novo anúncio</h2>
<p className="text-sm text-gray-600 mb-4">Preencha os campos essenciais. O cálculo é automático.</p>
<form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="md:col-span-2"><Label>Torneio</Label><Input value={form.tournament} onChange={e=>setForm(f=>({...f,tournament:e.target.value}))} placeholder="KSOP, BSOP..." required/></div>
<div><Label>Data</Label><Input type="date" value={form.date} onChange={e=>setForm(f=>({...f,date:e.target.value}))}/></div>
<div><Label>Local</Label><Input value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} placeholder="Florianópolis / Online"/></div>
<div><Label>Buy-in (R$)</Label><Input type="number" min={0} value={Number(form.buyin)} onChange={e=>setForm(f=>({...f,buyin:Number(e.target.value)}))}/></div>
<div><Label>Add-on (R$)</Label><Input type="number" min={0} value={Number(form.addon)} onChange={e=>setForm(f=>({...f,addon:Number(e.target.value)}))}/></div>
<div><Label>Taxas/Fee (R$)</Label><Input type="number" min={0} value={Number(form.fee)} onChange={e=>setForm(f=>({...f,fee:Number(e.target.value)}))}/></div>
<div><Label>Garantido</Label><Input value={form.guaranteed} onChange={e=>setForm(f=>({...f,guaranteed:e.target.value}))} placeholder="Ex.: R$ 1.000.000 GTD"/></div>
<div><Label>Nº de cotas</Label><Input type="number" min={1} value={Number(form.sharesTotal)} onChange={e=>setForm(f=>({...f,sharesTotal:Number(e.target.value)}))}/></div>
<div><Label>% por cota</Label><Input type="number" min={1} max={100} value={Number(form.percentPerShare)} onChange={e=>setForm(f=>({...f,percentPerShare:Number(e.target.value)}))}/></div>
<div><Label>Markup</Label><Input type="number" step={0.1} min={0.1} value={Number(form.markup)} onChange={e=>setForm(f=>({...f,markup:Number(e.target.value)}))}/></div>
<div className="md:col-span-2"><Card className="bg-orange-50 border-orange-200"><div className="text-sm text-gray-800"><div><span className="font-semibold">Custo total (com markup):</span> R$ {totalCost.toFixed(2)}</div><div><span className="font-semibold">Preço por cota ({Number(form.percentPerShare)}%):</span> R$ {pricePerShare.toFixed(2)}</div></div></Card></div>
<div className="md:col-span-2 flex gap-3"><Button type="submit">Publicar</Button></div>
</form>
</Card>
</div>
);
}