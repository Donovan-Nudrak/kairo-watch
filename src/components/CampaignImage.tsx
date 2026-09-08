import { useState } from 'react'

type CampaignImageProps = {
  src: string
  fallback: string
  alt: string
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export function CampaignImage({
  src,
  fallback,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
}: CampaignImageProps) {
  const [current, setCurrent] = useState(src)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <div className={`media-fallback ${className ?? ''}`} role="img" aria-label={alt} />
  }

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      fetchPriority={fetchPriority}
      onError={() => {
        if (current !== fallback) {
          setCurrent(fallback)
          return
        }
        setFailed(true)
      }}
    />
  )
}
