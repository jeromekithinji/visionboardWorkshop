export function FinalCtaSection ({ countdownItems, onOpenRegistration }) {
  return (
    <section className='section section-cta'>
      <div className='section-content'>
        <div className='cta-icon' aria-hidden='true'>✧</div>
        <h2>
          Your Next Level Requires
          <span className='gold-emphasis'>a Clear Vision.</span>
        </h2>
        <div className='reset-divider' aria-hidden='true'></div>
        <p>Another year will pass whether you design it or not.</p>
        <p className='question'>The question is — Will it be intentional?</p>
        <p className='countdown-title'>Time Is Running Out</p>
        <div className='countdown' role='timer' aria-live='polite'>
          {countdownItems.map((item) => (
            <article key={`footer-${item.label}`} className='countdown-card'>
              <strong>{String(item.value).padStart(2, '0')}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
        <button
          type='button'
          className='btn btn-primary'
          onClick={onOpenRegistration}
        >
          Secure My Seat
        </button>
        <p className='small-note'>
          Limited seats available. Registration closes once capacity is reached.
        </p>
        <p className='cta-enquiry'>
          <span className='email-icon' aria-hidden='true'>
            <svg viewBox='0 0 24 24'>
              <rect x='4' y='6.5' width='16' height='11' rx='1.8'></rect>
              <path d='M4.8 7.5L12 12.5l7.2-5'></path>
            </svg>
          </span>
          <span>
            For enquiries:{' '}
            <a href='mailto:helen@smartconsulting.co.ke'>
              helen@smartconsulting.co.ke
            </a>
          </span>
        </p>
      </div>
    </section>
  )
}
