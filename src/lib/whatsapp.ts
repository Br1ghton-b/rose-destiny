import { BRAND } from './config';

export function whatsappEnquiryLink(prefilledText: string) {
  return `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(prefilledText)}`;
}
