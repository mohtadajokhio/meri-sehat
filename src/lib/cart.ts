import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  variant?: string;
  price: number;
  qty: number;
  image: string;
};

const KEY = "ms_cart_v1";
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function write(items: CartItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(items));
  }
  listeners.forEach((l) => l());
}

export function addToCart(item: Omit<CartItem, "qty">, qty = 1) {
  const items = read();
  const i = items.findIndex((x) => x.id === item.id);
  if (i >= 0) items[i].qty += qty;
  else items.push({ ...item, qty });
  write(items);
}

export function updateQty(id: string, qty: number) {
  const items = read()
    .map((i) => (i.id === id ? { ...i, qty } : i))
    .filter((i) => i.qty > 0);
  write(items);
}

export function removeItem(id: string) {
  write(read().filter((i) => i.id !== id));
}

export function clearCart() {
  write([]);
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.price * i.qty, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((s, i) => s + i.qty, 0);
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const update = () => setItems(read());
    update();
    listeners.add(update);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) update();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(update);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  return items;
}

export const CONSULT_URL = "https://consult.careconnect.pk/booking-confirmed";

export const TIRZEE_VARIANTS = [
  { id: "tirzee-2-5", dose: "2.5 mg", volume: "0.5 mL", price: 4000 },
  { id: "tirzee-5", dose: "5 mg", volume: "0.5 mL", price: 6000 },
  { id: "tirzee-7-5", dose: "7.5 mg", volume: "0.5 mL", price: 7500 },
  { id: "tirzee-10", dose: "10 mg", volume: "0.5 mL", price: 10000 },
];

export const TIRZEE_NAME = "Tirzee";

// Default/starting variant used by landing card
export const TIRZEE_PRODUCT = {
  id: TIRZEE_VARIANTS[0].id,
  name: TIRZEE_NAME,
  variant: `Tirzepatide · ${TIRZEE_VARIANTS[0].dose} / ${TIRZEE_VARIANTS[0].volume}`,
  price: TIRZEE_VARIANTS[0].price,
};
