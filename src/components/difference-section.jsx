import helenKithinjiImage from '../assets/helen-kithinji.png'

export function DifferenceSection ({ differenceItems }) {
  return (
    <section className='section section-difference'>
      <div className='section-content'>
        <div className='difference-header'>
          <p className='section-kicker'>The Difference</p>
          <h2>
            Why This Is Not Just
            <span>Another Workshop</span>
          </h2>
          <p>This experience is structured, intentional, and transformative.</p>
        </div>
        <div className='difference-layout'>
          <ul className='difference-list'>
            {differenceItems.map((item) => (
              <li key={item}>
                <span className='check' aria-hidden='true'>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <article className='facilitator-card'>
            <img
              src={helenKithinjiImage}
              alt='Helen Kithinji portrait'
            />
            <div className='facilitator-body'>
              <p className='section-kicker'>Your Facilitator</p>
              <h3>Helen Kithinji</h3>
              <p className='subtitle'>Business Consultant, Coach, Author & Speaker</p>
              <div className='reset-divider' aria-hidden='true'></div>
              <p>
                With over 20 years of leadership and transformation experience
                across banking, consulting, and entrepreneurship, Helen has
                helped individuals and organizations align vision with
                execution. Now she&apos;s bringing that same strategic clarity
                process to you.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
