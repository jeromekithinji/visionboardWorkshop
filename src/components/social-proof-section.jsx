export function SocialProofSection ({ testimonials }) {
  return (
    <section className='section section-social-proof'>
      <div className='section-content'>
        <p className='section-kicker'>Social Proof</p>
        <h2>
          What Women Are
          <span className='gold-emphasis'>Saying</span>
        </h2>
        <div className='reset-divider' aria-hidden='true'></div>
        <p className='social-intro'>
          Real stories from women who have experienced Helen&apos;s transformative
          coaching and workshops.
        </p>
        <div className='grid testimonials'>
          {testimonials.map((item) => (
            <article key={item.name} className='card testimonial'>
              <p className='stars' aria-hidden='true'>★★★★★</p>
              <p>&quot;{item.quote}&quot;</p>
              <p className='author'>{item.name}</p>
              <p className='role'>{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
