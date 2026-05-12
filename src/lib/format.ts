import { BRAND } from './config';

export const formatPrice = (value: number) =>
  `${BRAND.currencySymbol}${value.toLocaleString('en-ZA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export const formatPriceRange = (min: number, max?: number) =>
  max && max !== min ? `${formatPrice(min)} – ${formatPrice(max)}` : formatPrice(min);

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const generateOrderId = () => {
  const now = new Date();
  const stamp =
    now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `RD-${stamp}-${rand}`;
};
