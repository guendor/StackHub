'use client';
import React from 'react';


export const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
<input {...p} className={(p.className||'')+" border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-orange-500/60"} />
);
export const Textarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
<textarea {...p} className={(p.className||'')+" border rounded-lg px-3 py-2 w-full outline-none focus:ring-2 focus:ring-orange-500/60 min-h-[96px]"} />
);
export const Label = ({children}:{children:React.ReactNode}) => (
<label className="text-sm font-medium text-gray-700">{children}</label>
);
export const Button = ({variant='primary',className='',...rest}:{variant?:'primary'|'secondary'|'ghost'} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
const base = "px-4 py-2 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed";
const s = variant==='primary'?" bg-orange-600 text-white hover:bg-orange-700":variant==='secondary'?" bg-gray-900 text-white hover:bg-black":" border border-gray-300 bg-white hover:bg-gray-50";
return <button className={base+s+" "+className} {...rest}/>;
};
export const Card = ({children,className=''}:{children:React.ReactNode,className?:string}) => (
<div className={"bg-white rounded-2xl shadow-sm border border-gray-100 p-5 "+className}>{children}</div>
);
export const Avatar = ({src,name,size=28}:{src?:string|null,name?:string,size?:number}) => (
<div style={{width:size,height:size}} className="rounded-full overflow-hidden bg-gray-200 border flex items-center justify-center">
{src ? <img src={src} alt="avatar" className="w-full h-full object-cover"/> : <span className="text-[10px] text-gray-500">{(name||'?').slice(0,1).toUpperCase()}</span>}
</div>
);