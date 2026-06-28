function IncludeTileIcon ({ index }) {
  if (index === 0) {
    return (
      <svg className='include-icon-svg' viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M4.5 7.5a2 2 0 0 1 2-2H11v12H6.5a2 2 0 0 0-2 2z'></path>
        <path d='M19.5 7.5a2 2 0 0 0-2-2H13v12h4.5a2 2 0 0 1 2 2z'></path>
        <line x1='12' y1='5.5' x2='12' y2='17.5'></line>
      </svg>
    )
  }

  if (index === 1) {
    return (
      <svg className='include-icon-svg' viewBox='0 0 24 24' aria-hidden='true'>
        <path d='M12 20s-6-3.8-6-9a3.8 3.8 0 0 1 6-3.1A3.8 3.8 0 0 1 18 11c0 5.2-6 9-6 9z'></path>
      </svg>
    )
  }

  if (index === 2) {
    return (
      <svg className='include-icon-svg' viewBox='0 0 24 24' aria-hidden='true'>
        <circle cx='12' cy='12' r='7'></circle>
        <circle cx='12' cy='12' r='4'></circle>
        <circle cx='12' cy='12' r='1.4'></circle>
      </svg>
    )
  }

  if (index === 3) {
    return (
      <svg className='include-icon-svg' viewBox='0 0 24 24' aria-hidden='true'>
        <circle cx='12' cy='12' r='7'></circle>
        <path d='M14.8 9.2l-1.9 4.8-4.7 1.8 1.9-4.8z'></path>
        <circle cx='12' cy='12' r='1.1'></circle>
      </svg>
    )
  }

  if (index === 4) {
    return (
      <svg className='include-icon-svg' viewBox='0 0 24 24' aria-hidden='true'>
        <circle cx='12' cy='8' r='4'></circle>
        <path d='M9.5 12.5l-1.2 4.5L12 15.4l3.7 1.6-1.2-4.5'></path>
      </svg>
    )
  }

  return (
    <svg className='include-icon-svg' viewBox='0 0 24 24' aria-hidden='true'>
      <circle cx='8.5' cy='10' r='3.2'></circle>
      <circle cx='15.5' cy='10.5' r='2.7'></circle>
      <path d='M4.8 17.5c.5-2.4 2.4-3.9 4.6-3.9s4.1 1.5 4.6 3.9'></path>
      <path d='M13.2 17.5c.4-1.9 1.9-3.1 3.8-3.1 1.2 0 2.3.5 3.1 1.5'></path>
    </svg>
  )
}

export function IncludedSection ({ inclusions }) {
  return (
    <section className='section section-included'>
      <div className='section-content'>
        <p className='section-kicker'>What&apos;s Included</p>
        <h2>
          When You Register,
          <span className='gold-emphasis'>You Access</span>
        </h2>
        <div className='reset-divider' aria-hidden='true'></div>
        <div className='include-grid'>
          {inclusions.map((item, index) => (
            <article key={`included-${item}`} className='include-tile'>
              <span className='include-icon' aria-hidden='true'>
                <IncludeTileIcon index={index} />
              </span>
              <h3>{item}</h3>
            </article>
          ))}
        </div>
        <p className='included-note'>
          This is more than a workshop.
          <span>It is a reset for your next chapter.</span>
        </p>
      </div>
    </section>
  )
}
