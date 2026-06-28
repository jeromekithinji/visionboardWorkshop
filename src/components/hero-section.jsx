export function HeroSection ({ countdownItems, onOpenRegistration }) {
  return (
    <section className='hero'>
      <div className='hero-content'>
        <div className='hero-icon' aria-hidden='true'>✦</div>
        <div className='eyebrow'>The Ladies Clarity & Visionboard Workshop</div>
        <h1>
          Clarity Changes
          <span className='hero-accent'>Everything</span>
        </h1>
        <p className='lead hero-tagline'>
          The one-day experience that turns vision into direction and dreams
          into action.
        </p>
        <div className='lead lead-secondary hero-lines'>
          <p>If you&apos;ve been busy but not aligned...</p>
          <p>successful but not fulfilled...</p>
          <p>achieving but not completely clear...</p>
          <p className='hero-moment'>This is your moment.</p>
        </div>
        <div className='countdown-wrap'>
          <p className='countdown-title'>Workshop Begins In</p>
          <div className='countdown' role='timer' aria-live='polite'>
            {countdownItems.map((item) => (
              <article key={item.label} className='countdown-card'>
                <strong>{String(item.value).padStart(2, '0')}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <ul className='event-meta'>
            <li>
              <svg className='meta-icon' viewBox='0 0 24 24' aria-hidden='true'>
                <rect x='3.5' y='5.5' width='17' height='15' rx='2.5'></rect>
                <line x1='3.5' y1='9' x2='20.5' y2='9'></line>
                <line x1='8' y1='3.5' x2='8' y2='7'></line>
                <line x1='16' y1='3.5' x2='16' y2='7'></line>
              </svg>
              <span>18th or 19th July 2026</span>
            </li>
            <li>
              <svg className='meta-icon' viewBox='0 0 24 24' aria-hidden='true'>
                <circle cx='12' cy='12' r='8.5'></circle>
                <line x1='12' y1='12' x2='12' y2='7.8'></line>
                <line x1='12' y1='12' x2='15.2' y2='13.8'></line>
              </svg>
              <span>Full Day Experience</span>
            </li>
            <li>
              <svg className='meta-icon' viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M12 20s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z'></path>
                <circle cx='12' cy='10' r='2.2'></circle>
              </svg>
              <span>Online</span>
            </li>
            <li>
              <svg className='meta-icon' viewBox='0 0 24 24' aria-hidden='true'>
                <path d='M3.5 8.5h17v3a2 2 0 0 0 0 4v3h-17v-3a2 2 0 0 0 0-4v-3z'></path>
                <line x1='12' y1='9.5' x2='12' y2='17.5'></line>
              </svg>
              <span>Limited Seats Available</span>
            </li>
          </ul>
        </div>
        <button
          type='button'
          className='btn btn-primary'
          onClick={onOpenRegistration}
        >
          Reserve My Seat Now
        </button>
        <p className='small-note'>
          Seats are intentionally limited to protect the depth and intimacy of
          the experience.
        </p>
      </div>
    </section>
  )
}
