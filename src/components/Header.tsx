import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { easePremium } from '../lib/motion'

const NAV = [
  { href: '#timepiece', label: 'Timepiece' },
  { href: '#engineering', label: 'Engineering' },
  { href: '#editions', label: 'Editions' },
] as const

type HeaderProps = {
  onReserve: () => void
}

export function Header({ onReserve }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduced = useReducedMotion()
  const menuId = useId()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('modal-open')
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const headerClass = [
    'site-header',
    scrolled ? 'is-scrolled' : '',
    menuOpen ? 'is-open' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
      <div className="site-header__shell">
        <div className="site-header__inner">
          <a className="logo" href="#timepiece" onClick={closeMenu}>
            KAIRO
          </a>

          <nav className="nav-desktop" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} className="nav-link" href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="btn header-reserve"
              onClick={() => {
                closeMenu()
                onReserve()
              }}
            >
              Reserve
              <ArrowRight size={14} strokeWidth={1.7} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={18} strokeWidth={1.4} aria-hidden="true" />
              ) : (
                <Menu size={18} strokeWidth={1.4} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id={menuId}
            className="nav-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: easePremium }}
          >
            <nav aria-label="Mobile">
              <ul className="nav-mobile__list">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} onClick={closeMenu}>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu()
                      onReserve()
                    }}
                  >
                    Reserve
                  </button>
                </li>
              </ul>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
