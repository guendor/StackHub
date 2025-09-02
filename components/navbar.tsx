'use client';
import { Button, Avatar } from './ui';


export default function Navbar({ user, onLogout }:{ user:any, onLogout:()=>void }){
return (
<div className="w-full sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-100">
<div className="max-w-5xl mx-auto flex items-center justify-between p-4">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-orange-600" />
<span className="font-bold text-lg">StakeHub <span className="text-gray-400">Alpha</span></span>
</div>
<div className="flex items-center gap-2">
<a href="/" className="text-sm">Marketplace</a>
{user?.role==='Jogador' && <a href="/create" className="text-sm">Criar anúncio</a>}
{user && <a href="/interests" className="text-sm">Meus interesses</a>}
{user && <a href="/profile" className="text-sm">Perfil</a>}
{!user && <a href="/login" className="text-sm">Entrar</a>}
{!user && <a href="/signup" className="text-sm">Cadastrar</a>}
{user && (
<div className="flex items-center gap-2 pl-2">
<Avatar src={user.photo} name={user.name} />
<span className="text-sm text-gray-600 hidden sm:inline">{user.name} · {user.role}</span>
<Button variant="ghost" onClick={onLogout}>Sair</Button>
</div>
)}
</div>
</div>
</div>
);
}