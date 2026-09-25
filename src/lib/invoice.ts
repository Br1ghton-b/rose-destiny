import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { BRAND } from './config';
import { formatPrice } from './format';
import type { CartItem } from '../stores/cart';

export interface OrderDetails {
  orderId: string;
  date: Date;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    city?: string;
    postalCode?: string;
  };
  delivery: {
    method: 'delivery' | 'collection';
    date: string;
    timeWindow: string;
    recipientName?: string;
    recipientPhone?: string;
    message?: string;
  };
  payment: {
    method: 'eft' | 'card-on-delivery' | 'whatsapp-arranged';
  };
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  vat: number;
  total: number;
  notes?: string;
}

const GOLD: [number, number, number] = [201, 162, 76];
const INK: [number, number, number] = [10, 10, 10];
const ROUGE: [number, number, number] = [142, 27, 42];
const IVORY: [number, number, number] = [250, 247, 240];

export function generateInvoicePdf(order: OrderDetails): jsPDF {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Ivory page background
  doc.setFillColor(...IVORY);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // Top gold band
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, pageWidth, 6, 'F');

  // Header: brand
  doc.setTextColor(...INK);
  doc.setFont('times', 'normal');
  doc.setFontSize(28);
  doc.text(BRAND.name, 40, 70);

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text('Luxury Florals · Hand-Tied with Grace', 40, 88);

  // Invoice meta (right side)
  doc.setTextColor(...INK);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', pageWidth - 40, 60, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Order  ${order.orderId}`, pageWidth - 40, 76, { align: 'right' });
  doc.text(`Issued  ${order.date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}`, pageWidth - 40, 90, { align: 'right' });

  // Hairline
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(40, 110, pageWidth - 40, 110);

  // Two-column: From / Billed To
  const leftX = 40;
  const rightX = pageWidth / 2 + 10;
  let y = 130;
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text('FROM', leftX, y);
  doc.text('BILLED TO', rightX, y);

  y += 14;
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  doc.setFont('helvetica', 'bold');
  doc.text(BRAND.name, leftX, y);
  doc.text(order.customer.name || '—', rightX, y);
  y += 12;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text(BRAND.address, leftX, y, { maxWidth: pageWidth / 2 - 60 });
  doc.text(order.customer.email || '—', rightX, y);
  y += 12;
  doc.text(BRAND.phone, leftX, y);
  doc.text(order.customer.phone || '—', rightX, y);
  if (order.customer.address) {
    y += 12;
    doc.text('', leftX, y);
    doc.text(order.customer.address, rightX, y, { maxWidth: pageWidth / 2 - 60 });
  }

  // Delivery info block
  y += 32;
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text(order.delivery.method === 'delivery' ? 'DELIVERY' : 'COLLECTION', leftX, y);
  y += 14;
  doc.setFontSize(9);
  doc.setTextColor(...INK);
  doc.setFont('helvetica', 'normal');
  const deliveryLines = [
    `${order.delivery.date} · ${order.delivery.timeWindow}`,
    order.delivery.recipientName ? `Recipient: ${order.delivery.recipientName}` : '',
    order.delivery.recipientPhone ? `Recipient phone: ${order.delivery.recipientPhone}` : '',
    order.delivery.message ? `Card message: "${order.delivery.message}"` : '',
  ].filter(Boolean);
  deliveryLines.forEach((line) => {
    doc.text(line, leftX, y, { maxWidth: pageWidth - 80 });
    y += 12;
  });

  // Items table
  y += 14;
  autoTable(doc, {
    startY: y,
    head: [['Item', 'Size', 'Qty', 'Unit', 'Total']],
    body: order.items.map((i) => [
      i.name,
      i.sizeLabel,
      String(i.quantity),
      formatPrice(i.price),
      formatPrice(i.price * i.quantity),
    ]),
    styles: { font: 'helvetica', fontSize: 9, cellPadding: 8, textColor: INK },
    headStyles: {
      fillColor: INK,
      textColor: IVORY,
      fontStyle: 'bold',
      fontSize: 8,
      cellPadding: 8,
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { cellWidth: 110 },
      2: { cellWidth: 40, halign: 'center' },
      3: { cellWidth: 70, halign: 'right' },
      4: { cellWidth: 80, halign: 'right' },
    },
    alternateRowStyles: { fillColor: [245, 240, 228] },
    margin: { left: 40, right: 40 },
  });

  // Totals
  // @ts-expect-error lastAutoTable injected by jspdf-autotable
  const afterTableY = (doc.lastAutoTable.finalY as number) + 24;
  const labelX = pageWidth - 180;
  const valueX = pageWidth - 40;
  let ty = afterTableY;

  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  const row = (label: string, value: string, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setTextColor(...(bold ? INK : [80, 80, 80] as [number, number, number]));
    doc.text(label, labelX, ty);
    doc.text(value, valueX, ty, { align: 'right' });
    ty += 14;
  };
  row('Subtotal', formatPrice(order.subtotal));
  row('Delivery', order.deliveryFee === 0 ? 'Complimentary' : formatPrice(order.deliveryFee));
  row('VAT (15%)', formatPrice(order.vat));

  // Total bar
  ty += 4;
  doc.setFillColor(...INK);
  doc.rect(labelX - 16, ty - 12, valueX - labelX + 22, 28, 'F');
  doc.setTextColor(...IVORY);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL', labelX, ty + 5);
  doc.setTextColor(201, 162, 76);
  doc.text(formatPrice(order.total), valueX, ty + 5, { align: 'right' });

  // Footer
  const footerY = pageHeight - 80;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.5);
  doc.line(40, footerY, pageWidth - 40, footerY);
  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(...ROUGE);
  doc.text('Thank you for choosing Rose Destiny.', pageWidth / 2, footerY + 22, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text(
    `${BRAND.name}  ·  ${BRAND.email}  ·  ${BRAND.phone}`,
    pageWidth / 2,
    footerY + 40,
    { align: 'center' },
  );
  doc.text(
    'Payment is confirmed on receipt of cleared funds. This invoice is your proof of order.',
    pageWidth / 2,
    footerY + 54,
    { align: 'center' },
  );

  // Bottom gold band
  doc.setFillColor(...GOLD);
  doc.rect(0, pageHeight - 6, pageWidth, 6, 'F');

  return doc;
}

export function downloadInvoice(order: OrderDetails) {
  const doc = generateInvoicePdf(order);
  doc.save(`${order.orderId}-RoseDestiny.pdf`);
}
