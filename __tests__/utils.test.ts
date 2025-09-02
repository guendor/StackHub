import { describe, it, expect } from 'vitest';
import { strongPassword, hash } from '../lib/auth';
import { uuid } from '../lib/storage';


describe('auth utils', () => {
it('rejects weak password and accepts strong one', () => {
expect(strongPassword('abcdefg')).toBe(false);
expect(strongPassword('Abcdef1!')).toBe(true);
});
it('hash is deterministic', () => {
expect(hash('abc')).toBe(hash('abc'));
});
});


describe('uuid', () => {
it('generates ~unique ids', () => {
const set = new Set(Array.from({length:128}, ()=>uuid()));
expect(set.size).toBe(128);
});
});