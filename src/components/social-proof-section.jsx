export function SocialProofSection ({ testimonials }) {
  return (
    <section className='section section-social-proof'>
      <div className='section-content'>
        <p className='section-kicker'>Social Proof</p>
        <p className='social-intro'>
          Real stories from people who have experienced Helen&apos;s transformative
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
