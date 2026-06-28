export function TransformationSection ({ outcomes }) {
  return (
    <section className='section transformation-section'>
      <div className='section-content'>
        <p className='section-kicker'>The Transformation</p>
        <h2>
          What Happens In This Workshop
          <span>Changes Your Next Season</span>
        </h2>
        <p className='transformation-intro'>
          In one powerful day, you will walk away with clarity, direction, and
          a concrete plan of action.
        </p>
        <div className='grid outcomes'>
          {outcomes.map((item) => (
            <article
              key={item.title}
              className={`card outcome-card ${item.isFeatured ? 'featured' : ''}`}
            >
              <span className='outcome-icon' aria-hidden='true'>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
        <p className='transformation-note'>
          This is not a talk. This is guided clarity with implementation.
          <span>You will not leave inspired. You will leave aligned.</span>
        </p>
      </div>
    </section>
  )
}
