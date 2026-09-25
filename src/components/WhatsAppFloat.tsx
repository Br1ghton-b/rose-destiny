import { MessageCircle } from 'lucide-react';
import { whatsappEnquiryLink } from '../lib/whatsapp';
import { motion } from 'framer-motion';

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappEnquiryLink('Hello Rose Destiny, I would like to enquire about your cleaning services.')}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 16 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 group"
    >
      <span className="absolute inset-0 rounded-full bg-green-500/30 animate-ping" />
      <span className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_12px_40px_-8px_rgba(37,211,102,0.6)] hover:scale-105 transition">
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={1.5} />
      </span>
      <span className="hidden sm:block absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap bg-ink text-ivory text-xs uppercase tracking-[0.22em] px-3 py-2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
        Chat with us
      </span>
    </motion.a>
  );
}
