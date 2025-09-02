'use client';
import { getDebugFlag, setDebug } from '@/lib/storage';
import { useEffect, useState } from 'react';


export default function DebugToggle(){
const [on,setOn]=useState(false);
useEffect(()=>{ setOn(getDebugFlag()); },[]);
const toggle=()=>{ setDebug(!on); setOn(!on); };
return (
<button onClick={toggle} style={{position:'fixed',bottom:10,right:10,zIndex:1000,background:on?'#f97316':'#999',color:'white',padding:'6px 10px',borderRadius:'8px'}}>
DEBUG {on?'ON':'OFF'}
</button>
);
}