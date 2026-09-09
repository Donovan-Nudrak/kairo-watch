const CONTACT = [
  { href: 'https://nudrak.dev', label: 'Web', value: 'nudrak.dev' },
  {
    href: 'https://www.linkedin.com/in/donovan-a-83b7ba3a2',
    label: 'LinkedIn',
    value: 'donovan-a-83b7ba3a2',
  },
  { href: 'https://github.com/Donovan-Nudrak', label: 'GitHub', value: 'Donovan-Nudrak' },
  { href: 'https://www.instagram.com/nudrak.dev/', label: 'Instagram', value: '@nudrak.dev' },
] as const

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <div className="site-footer__brand">
          <strong>KAIRO</strong>
          <span>Concept timepiece — 2026</span>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <a className="nav-link" href="#timepiece">
            Timepiece
          </a>
          <a className="nav-link" href="#engineering">
            Engineering
          </a>
          <a className="nav-link" href="#editions">
            Editions
          </a>
        </nav>
        <nav className="site-footer__contact" aria-label="Contact">
          {CONTACT.map((item) => (
            <a
              key={item.href}
              className="nav-link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              <span>{item.label}</span>
              {item.value}
            </a>
          ))}
        </nav>
        <p className="site-footer__legal">
          A frontend design concept. Chrono 01 is a fictional timepiece created for visual study.
          No orders are fulfilled and no payment is processed.
        </p>
      </div>
    </footer>
  )
}
