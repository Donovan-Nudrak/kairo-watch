import { useCallback, type PointerEvent as ReactPointerEvent } from 'react'
import { useReducedMotion } from 'framer-motion'

export function usePointerLight() {
  const reduced = useReducedMotion()

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (reduced || event.pointerType !== 'mouse') return
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      el.style.setProperty('--spot-x', `${x}%`)
      el.style.setProperty('--spot-y', `${y}%`)
    },
    [reduced],
  )

  const onPointerLeave = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--spot-x', '50%')
    event.currentTarget.style.setProperty('--spot-y', '40%')
  }, [])

  return { onPointerMove, onPointerLeave }
}
