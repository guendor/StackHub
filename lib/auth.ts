import { load, save, log } from './storage';
import { LS_KEYS, User } from './models';


export const hash = (s: string) => Array.from(String(s||''))
.reduce((a,ch)=>((a<<5)-a)+ch.charCodeAt(0)|0,0).toString(16);


export const strongPassword = (s: string) => /(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.*[0-9]).{8,}/.test(String(s||''));


export function currentUser(): User | null { return load<User|null>(LS_KEYS.user, null); }
export function setSession(u: User | null){ if (u) save(LS_KEYS.user, u); else try { localStorage.removeItem(LS_KEYS.user); } catch {} }


export function signup(u: Omit<User,'id'|'photo'|'passHash'> & { password: string }, uuid: ()=>string): User | { error: string } {
if (!strongPassword(u.password)) return { error: 'Senha fraca. Use 8+ caracteres, 1 maiúscula, 1 número e 1 especial.' };
const users = load<User[]>(LS_KEYS.users, []);
if (users.some(x => x.email.toLowerCase() === u.email.toLowerCase())) return { error: 'E-mail já cadastrado.' };
const nu: User = { id: uuid(), name: u.name||u.email.split('@')[0]||'Usuário', email: u.email, whatsapp: u.whatsapp.replace(/\D/g,''), role: u.role, photo: null, passHash: hash(u.password) };
save(LS_KEYS.users, [nu, ...users]); save(LS_KEYS.user, nu); return nu;
}


export function login(email: string, password: string): User | { error: string } {
const users = load<User[]>(LS_KEYS.users, []);
const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
if (!found) return { error: 'Usuário não encontrado.' };
if (found.passHash !== hash(password)) return { error: 'Senha incorreta.' };
save(LS_KEYS.user, found); return found;
}