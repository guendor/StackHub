'use client';
import { Card, Button } from '@/components/ui';
import { LS_KEYS, Interest, Listing } from '@/lib/models';
import { load } from '@/lib/storage';
import { currentUser } from '@/lib/auth';


export default function Page(){
const u = currentUser();
if(!u) return <div className="max-w-3xl mx-auto mt-6"><Card>Faça login para ver seus interesses.</Card></div>;
const interests = load<Interest[]>(LS_KEYS.interests, []).filter(i=>i.investorId===u.id).sort((a,b)=>b.createdAt-a.createdAt);
const listings = load<Listing[]>(LS_KEYS.listings, []);
return(
<div className="max-w-4xl mx-auto mt-6">
<Card>
<h2 className="text-xl font-bold mb-2">Meus interesses</h2>
{interests.length===0&&<p className="text-sm text-gray-600">Você ainda não fez reservas.</p>}
<div className="space-y-2">
{interests.map(i=>{const l=listings.find(x=>x.id===i.listingId);return (
<Card key={i.id} className="bg-gray-50">
<div className="flex items-center justify-between">
<div><div className="font-medium text-sm">{l?.tournament} — {i.qty} cota(s) — {i.status}</div><div className="text-xs text-gray-600">{l?.location||''}</div></div>
<div className="flex gap-2">{i.status==='ACCEPTED'&&<a href={`/chat/${i.id}`}><Button variant="secondary">Abrir chat</Button></a>}{i.status==='ACCEPTED'&&l?.ownerWhatsapp&&<a href={`https://wa.me/${l.ownerWhatsapp}`} target="_blank" rel="noreferrer"><Button>WhatsApp</Button></a>}</div>
</div>
</Card>
)})}
</div>
</Card>
</div>
);
}
