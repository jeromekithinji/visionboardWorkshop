export function InvestmentSection ({ inclusions, onOpenRegistration }) {
  return (
    <section id='register' className='section section-investment'>
      <div className='section-content'>
        <p className='section-kicker'>Investment</p>
        <h2>
          Invest In Your
          <span className='gold-emphasis'>Next Chapter</span>
        </h2>
        <div className='reset-divider' aria-hidden='true'></div>
        <article className='pricing-card'>
          <header className='pricing-top'>
            <p className='pricing-title'>Full Day Workshop</p>
            <p className='price'>Ksh 10,000</p>
            <p className='pricing-date'>One-time investment · Saturday, 9th May 2026</p>
          </header>
          <div className='pricing-body'>
            <h3>Everything Included:</h3>
            <ul className='pricing-list'>
              <li>
                <span className='check' aria-hidden='true'>✓</span>
                <span>Full-day guided clarity experience</span>
              </li>
              {inclusions.map((item) => (
                <li key={item}>
                  <span className='check' aria-hidden='true'>✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button
              type='button'
              className='btn btn-primary'
              onClick={onOpenRegistration}
            >
              Secure My Seat
            </button>
            <p className='small-note'>
              Limited seats available · registration closes once capacity is
              reached.
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
