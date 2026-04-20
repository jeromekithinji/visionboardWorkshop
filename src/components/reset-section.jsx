export function ResetSection ({ workshopHighlights }) {
  return (
    <section className='section section-reset'>
      <div className='section-content reset-content'>
        <div className='reset-copy'>
          <p className='section-kicker'>It&apos;s Time for a Reset</p>
          <h2>
            You Don&apos;t Need More Motivation.
            <span className='gold-emphasis'>You Need Clarity.</span>
          </h2>
          <div className='reset-divider' aria-hidden='true'></div>
          <div className='reset-lines'>
            <p>You are capable.</p>
            <p>You are driven.</p>
            <p>You are achieving.</p>
          </div>
          <p className='reset-paragraph'>
            But somewhere between responsibilities, expectations, and
            ambition... alignment may have shifted.
          </p>
          <p className='reset-subheading'>This workshop is for women who:</p>
          <ul className='list reset-list'>
            {workshopHighlights.map((item) => (
              <li key={item}>
                <span className='star' aria-hidden='true'>☆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className='reset-quote'>
            You don&apos;t need another motivational quote.
            <span>You need a strategic reset.</span>
          </p>
        </div>
        <div className='reset-image-wrap'>
          <img
            src='https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1400&q=80'
            alt='Women in a workshop session around a table'
          />
        </div>
      </div>
    </section>
  )
}
