import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from './cart';

export interface SavedOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  vat: number;
  total: number;
  deliveryMethod: 'delivery' | 'collection';
  deliveryDate: string;
  deliveryTimeWindow: string;
  recipientName?: string;
  message?: string;
  paymentMethod: 'eft' | 'card-on-delivery' | 'whatsapp-arranged';
  status: 'pending' | 'confirmed' | 'delivered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
  address?: string;
  city?: string;
  postalCode?: string;
  orders: SavedOrder[];
}

interface AuthState {
  users: User[];
  currentUserId: string | null;
  register: (input: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
  currentUser: () => User | null;
  updateProfile: (patch: Partial<Omit<User, 'id' | 'passwordHash' | 'createdAt' | 'orders'>>) => void;
  recordOrder: (order: SavedOrder) => void;
}

async function hashPassword(pw: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}::${pw}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

const normEmail = (e: string) => e.trim().toLowerCase();

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [],
      currentUserId: null,

      register: async ({ name, email, phone, password }) => {
        const e = normEmail(email);
        if (!name.trim()) return { ok: false, error: 'Please enter your name.' };
        if (!/^\S+@\S+\.\S+$/.test(e)) return { ok: false, error: 'Please enter a valid email.' };
        if (password.length < 8) return { ok: false, error: 'Password must be at least 8 characters.' };
        if (get().users.some((u) => u.email === e)) {
          return { ok: false, error: 'An account already exists for this email. Please sign in.' };
        }
        const id = `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
        const passwordHash = await hashPassword(password, e);
        const user: User = {
          id,
          name: name.trim(),
          email: e,
          phone: phone.trim(),
          passwordHash,
          createdAt: new Date().toISOString(),
          orders: [],
        };
        set((state) => ({ users: [...state.users, user], currentUserId: id }));
        return { ok: true };
      },

      login: async (email, password) => {
        const e = normEmail(email);
        const user = get().users.find((u) => u.email === e);
        if (!user) return { ok: false, error: 'No account with that email. Please register.' };
        const hash = await hashPassword(password, e);
        if (hash !== user.passwordHash) return { ok: false, error: 'Incorrect password. Try again.' };
        set({ currentUserId: user.id });
        return { ok: true };
      },

      logout: () => set({ currentUserId: null }),

      currentUser: () => {
        const id = get().currentUserId;
        return id ? get().users.find((u) => u.id === id) ?? null : null;
      },

      updateProfile: (patch) => {
        const id = get().currentUserId;
        if (!id) return;
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...patch } : u)),
        }));
      },

      recordOrder: (order) => {
        const id = get().currentUserId;
        if (!id) return;
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, orders: [order, ...u.orders] } : u,
          ),
        }));
      },
    }),
    { name: 'rose-destiny-auth' },
  ),
);
