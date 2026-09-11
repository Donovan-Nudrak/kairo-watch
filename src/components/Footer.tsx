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
        <p className="site-footer__legal">
          A frontend design concept. Chrono 01 is a fictional timepiece created for visual study.
          No orders are fulfilled and no payment is processed.
        </p>
      </div>
    </footer>
  )
}
