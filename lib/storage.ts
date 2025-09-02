import { emitStorage } from './bus';


export function safeLocalStorageGet(k: string) { try { return typeof localStorage !== 'undefined' ? localStorage.getItem(k) : null; } catch { return null; } }
export function safeLocalStorageSet(k: string, v: string) { try { if (typeof localStorage !== 'undefined') localStorage.setItem(k, v); } catch {} }
export function safeLocalStorageRemove(k: string) { try { if (typeof localStorage !== 'undefined') localStorage.removeItem(k); } catch {} }


let DEBUG = false;
export function getDebugFlag(){
try {
const urlOn = typeof location !== 'undefined' && /[?&]debug=1/.test(location.search);
const lsOn = safeLocalStorageGet('stakehub.debug') === '1';
const winOn = typeof window !== 'undefined' && !!(window as any).__DEBUG;
return !!(urlOn || lsOn || winOn);
} catch { return false; }
}
export function setDebug(on: boolean){
if (on) { safeLocalStorageSet('stakehub.debug','1'); if (typeof window!=='undefined') (window as any).__DEBUG = true; }
else { safeLocalStorageRemove('stakehub.debug'); if (typeof window!=='undefined') (window as any).__DEBUG = false; }
DEBUG = getDebugFlag();
}
DEBUG = getDebugFlag();


export const log = {
debug: (...a: any[]) => { if (DEBUG) console.debug('[DBG]', ...a); },
info: (...a: any[]) => console.info('[INFO]', ...a),
warn: (...a: any[]) => console.warn('[WARN]', ...a),
error: (...a: any[]) => console.error('[ERR]', ...a),
};
export const dbg = (...a: any[]) => log.debug(...a);


export function load<T>(key: string, fallback: T): T {
try { const raw = safeLocalStorageGet(key); log.debug('[LOAD]', key, raw ? raw.length+' chars' : null); return raw ? JSON.parse(raw) as T : fallback; } catch (e) { log.error('[LOAD ERROR]', key, e); return fallback; }
}
export function save<T>(key: string, value: T){
const kind = Array.isArray(value) ? 'array' : (value && typeof value === 'object' ? 'object' : typeof value);
const size = Array.isArray(value) ? value.length : (value && typeof value === 'object' ? Object.keys(value as any).length : String(value ?? '').length);
log.debug('[SAVE]', { key, kind, size });
try { if (typeof localStorage !== 'undefined') localStorage.setItem(key, JSON.stringify(value)); }
catch (e) { log.error('[SAVE ERROR]', key, e); }
emitStorage(key);
}


let __uuidCounter = 0;
function getCrypto(){ try { const w = typeof window !== 'undefined' ? window : undefined; if (w && (w as any).crypto) return (w as any).crypto; /* @ts-ignore */ if (typeof crypto !== 'undefined') return crypto as any; } catch {} return null; }
export function uuid(){
try {
const c = getCrypto();
if (c && typeof c.randomUUID === 'function') return c.randomUUID();
if (c && typeof c.getRandomValues === 'function') { const b = new Uint8Array(16); c.getRandomValues(b); b[6]=(b[6]&0x0f)|0x40; b[8]=(b[8]&0x3f)|0x80; const h = Array.from(b,x=>x.toString(16).padStart(2,'0')); return `${h[0]}${h[1]}${h[2]}${h[3]}-${h[4]}${h[5]}-${h[6]}${h[7]}-${h[8]}${h[9]}-${h[10]}${h[11]}${h[12]}${h[13]}${h[14]}${h[15]}`; }
} catch {}
__uuidCounter=(__uuidCounter+1)&0xffff; const tpl='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,c=>{const r=Math.random()*16|0,v=c==='x'?r:(r&0x3|0x8);return v.toString(16)}); return tpl+'-'+Date.now().toString(36)+__uuidCounter.toString(16).padStart(4,'0');
}