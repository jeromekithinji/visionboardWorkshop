export function ForYouSection ({ onOpenRegistration }) {
  return (
    <section className='section section-for-you'>
      <div className='section-content'>
        <p className='section-kicker'>Is This For You?</p>
        <h2>
          This Experience Is
          <span className='gold-emphasis'>For You If...</span>
        </h2>
        <div className='reset-divider' aria-hidden='true'></div>
        <ul className='for-you-list'>
          <li>
            <span className='for-you-icon' aria-hidden='true'>
              <svg className='for-you-icon-svg' viewBox='0 0 24 24'>
                <circle cx='12' cy='8' r='4'></circle>
                <path d='M9.5 12.5l-1.2 4.5L12 15.4l3.7 1.6-1.2-4.5'></path>
              </svg>
            </span>
            <span>You are a professional, entrepreneur, or leader</span>
          </li>
          <li>
            <span className='for-you-icon' aria-hidden='true'>
              <svg className='for-you-icon-svg' viewBox='0 0 24 24'>
                <path d='M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z'></path>
                <path d='M18.5 14.5l.7 2 .8.3-.8.3-.7 2-.7-2-.8-.3.8-.3.7-2z'></path>
              </svg>
            </span>
            <span>You are stepping into a new life season</span>
          </li>
          <li>
            <span className='for-you-icon' aria-hidden='true'>
              <svg className='for-you-icon-svg' viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='7'></circle>
                <circle cx='12' cy='12' r='4'></circle>
                <circle cx='12' cy='12' r='1.4'></circle>
              </svg>
            </span>
            <span>You are ready to stop drifting and start designing</span>
          </li>
          <li>
            <span className='for-you-icon' aria-hidden='true'>
              <svg className='for-you-icon-svg' viewBox='0 0 24 24'>
                <path d='M5 6.5h6.8v11H5z'></path>
                <path d='M12.2 6.5H19v11h-6.8'></path>
              </svg>
            </span>
            <span>You want structure around your dreams</span>
          </li>
          <li>
            <span className='for-you-icon' aria-hidden='true'>
              <svg className='for-you-icon-svg' viewBox='0 0 24 24'>
                <circle cx='12' cy='12' r='7'></circle>
                <path d='M9 15l6-6'></path>
              </svg>
            </span>
            <span>You are tired of being busy without being aligned</span>
          </li>
        </ul>
        <p className='for-you-closing'>
          If you are ready for your next level - this room is for you.
        </p>
        <button
          type='button'
          className='btn btn-secondary'
          onClick={onOpenRegistration}
        >
          Reserve My Seat Now
        </button>
      </div>
    </section>
  )
}
