import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { whatsappEnquiryLink } from '../lib/whatsapp';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappEnquiryLink('Hello Rose Destiny, I would like to enquire about your cleaning services.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 16 }}
      className="group fixed bottom-5 right-5 z-30 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/25 [animation-duration:2.5s]" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_14px_36px_-10px_rgba(37,211,102,0.7)] transition group-hover:scale-105">
        <MessageCircle className="h-6 w-6 text-white" strokeWidth={1.6} />
      </span>
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy-700 opacity-0 shadow-soft transition group-hover:opacity-100 sm:block">
        Chat with us
      </span>
    </motion.a>
  );
}
