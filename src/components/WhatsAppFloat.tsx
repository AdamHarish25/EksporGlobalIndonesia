import { MessageCircle } from 'lucide-react'
import { LINKS } from '@/constants'

export default function WhatsAppFloat() {
  return (
    <a
      href={LINKS.whatsAppFloat}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-[60] bottom-5 right-5 sm:bottom-7 sm:right-7 inline-flex items-center justify-center group"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-30 group-hover:opacity-50 transition-opacity" />
      <span className="relative inline-flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 shadow-2xl shadow-brand-600/40 ring-4 ring-white transition-transform group-hover:scale-105">
        <MessageCircle size={28} className="text-white sm:size-[30px] fill-white/15" />
      </span>
    </a>
  )
}
