export const LS_KEYS = {
user: "stakehub.user",
users: "stakehub.users",
listings: "stakehub.listings",
interests: "stakehub.interests",
messages: "stakehub.messages",
titles: "stakehub.titles",
} as const;


export type Role = 'Jogador' | 'Investidor';


export type User = {
id: string;
name: string;
email: string;
whatsapp: string;
role: Role;
photo: string | null;
passHash: string;
};


export type Listing = {
id: string;
ownerId: string;
ownerName: string;
ownerPhoto: string | null;
ownerWhatsapp?: string;
tournament: string;
date?: string;
location?: string;
buyin: number; addon?: number; fee?: number; guaranteed?: string;
sharesTotal: number; sharesOpen?: number; percentPerShare: number; markup?: number;
createdAt: number;
};


export type Interest = {
id: string; listingId: string; investorId: string;
qty: number; msg?: string; status: 'PENDING'|'ACCEPTED'|'DECLINED'; createdAt: number;
};


export type Message = { id: string; senderId: string; text: string; ts: number };
export type Threads = Record<string, Message[]>; // by interestId