export function SiteFooter () {
  return (
    <footer className='site-footer'>
      <p>Ladies Clarity & Visionboard Workshop</p>
      <p>Facilitated by Helen Kithinji</p>
      <p className='footer-email'>
        <span className='email-icon' aria-hidden='true'>
          <svg viewBox='0 0 24 24'>
            <rect x='4' y='6.5' width='16' height='11' rx='1.8'></rect>
            <path d='M4.8 7.5L12 12.5l7.2-5'></path>
          </svg>
        </span>
        <a href='mailto:helen@smartconsulting.co.ke'>
          helen@smartconsulting.co.ke
        </a>
      </p>
      <p>© 2026 Helen Kithinji. All rights reserved.</p>
    </footer>
  )
}
