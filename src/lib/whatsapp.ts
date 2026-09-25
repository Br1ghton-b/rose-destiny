import { BRAND } from './config';
import { formatPrice } from './format';
import type { OrderDetails } from './invoice';

const line = (s = '') => s;

export function buildOrderWhatsAppMessage(order: OrderDetails): string {
  const lines: string[] = [];
  lines.push(`*New Order — ${BRAND.name}*`);
  lines.push(`Order #: ${order.orderId}`);
  lines.push(`Placed: ${order.date.toLocaleString('en-ZA')}`);
  lines.push('');
  lines.push(`*Customer*`);
  lines.push(`${order.customer.name}`);
  lines.push(`${order.customer.phone}`);
  lines.push(`${order.customer.email}`);
  if (order.customer.address) {
    lines.push(`${order.customer.address}${order.customer.city ? ', ' + order.customer.city : ''}${order.customer.postalCode ? ' ' + order.customer.postalCode : ''}`);
  }
  lines.push('');
  lines.push(`*${order.delivery.method === 'delivery' ? 'Delivery' : 'Collection'}*`);
  lines.push(`${order.delivery.date} · ${order.delivery.timeWindow}`);
  if (order.delivery.recipientName) lines.push(`Recipient: ${order.delivery.recipientName}`);
  if (order.delivery.recipientPhone) lines.push(`Recipient phone: ${order.delivery.recipientPhone}`);
  if (order.delivery.message) lines.push(`Card message: "${order.delivery.message}"`);
  lines.push('');
  lines.push(`*Items*`);
  order.items.forEach((i) => {
    lines.push(`• ${i.quantity} × ${i.name} (${i.sizeLabel}) — ${formatPrice(i.price * i.quantity)}`);
  });
  lines.push('');
  lines.push(`Subtotal: ${formatPrice(order.subtotal)}`);
  lines.push(`Delivery: ${order.deliveryFee === 0 ? 'Complimentary' : formatPrice(order.deliveryFee)}`);
  lines.push(`VAT (15%): ${formatPrice(order.vat)}`);
  lines.push(`*Total: ${formatPrice(order.total)}*`);
  lines.push('');
  lines.push(`Payment: ${order.payment.method === 'eft' ? 'EFT (instructions to follow)' : order.payment.method === 'card-on-delivery' ? 'Card on delivery' : 'To be arranged via WhatsApp'}`);
  if (order.notes) {
    lines.push('');
    lines.push(`Notes: ${order.notes}`);
  }
  return lines.map(line).join('\n');
}

export function openOrderOnWhatsApp(order: OrderDetails) {
  const text = encodeURIComponent(buildOrderWhatsAppMessage(order));
  const url = `https://wa.me/${BRAND.whatsappNumber}?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function whatsappEnquiryLink(prefilledText: string) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(prefilledText)}`;
}
