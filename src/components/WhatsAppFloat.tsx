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
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-8 w-8 sm:h-[34px] sm:w-[34px] fill-white"
        >
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.89c0 2.1.55 4.15 1.6 5.96L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.89-5.33 11.89-11.89 0-3.17-1.24-6.15-3.43-8.43Zm-8.47 18.3h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.88 9.88 0 0 1-1.52-5.26C2.16 6.42 6.59 2 12.05 2a9.84 9.84 0 0 1 7.02 2.91 9.84 9.84 0 0 1 2.91 7.01c0 5.46-4.44 9.89-9.93 9.89Zm5.42-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </span>
    </a>
  )
}
