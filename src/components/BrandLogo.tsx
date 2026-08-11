import React from 'react'

interface BrandLogoProps {
  className?: string
  size?: number
  line?: string
  background?: boolean
  rounded?: boolean
}

export default function BrandLogo({ className = '', size = 38, line = '', background = false, rounded = false }: BrandLogoProps) {
  return (
    <div className="flex flex-col gap-2">
      <img
        src={background ? './logoBG-green.png' : './logo-green.png'}
        alt="EGI"
        className={`${rounded ? 'rounded-xl' : ''} ${className}`}
      />
      <div className="text-[9px] font-medium text-brand-700 uppercase tracking-[0.12em]">{line}</div>
    </div>
  )
}
