import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  sizeLabel: string;
  price: number;
  quantity: number;
  note?: string;
}

interface CartState {
  items: CartItem[];
  open: boolean;
  add: (item: Omit<CartItem, 'id'>) => void;
  remove: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  subtotal: () => number;
  count: () => number;
}

const lineKey = (productId: string, sizeLabel: string) => `${productId}::${sizeLabel}`;

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      add: (item) => {
        const id = lineKey(item.productId, item.sizeLabel);
        set((state) => {
          const existing = state.items.find((i) => i.id === id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
              open: true,
            };
          }
          return { items: [...state.items, { ...item, id }], open: true };
        });
      },
      remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'rose-destiny-cart' },
  ),
);
