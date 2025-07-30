'use client'

interface TrekHeroImageProps {
  src: string
  alt: string
  className: string
}

export default function TrekHeroImage({ src, alt, className }: TrekHeroImageProps) {
  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      onLoad={() => console.log(`Successfully loaded banner image for ${alt}: ${src}`)}
      onError={(e) => {
        console.error(`Failed to load banner image for ${alt}:`, src)
        const target = e.target as HTMLImageElement
        target.src = '/images/treks/buran-ghati3.jpg'
      }}
    />
  )
}