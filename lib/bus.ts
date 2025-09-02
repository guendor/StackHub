export function emitStorage(key: string) {
try { if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('stakehub:storage', { detail: { key } })); } catch {}
}
export function onStorage(handler: (key: string) => void) {
function h(e: any){ const k = e?.detail?.key as string; if (k) handler(k); }
if (typeof window !== 'undefined') window.addEventListener('stakehub:storage', h);
return () => { if (typeof window !== 'undefined') window.removeEventListener('stakehub:storage', h); };
}