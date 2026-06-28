import { useState } from 'react'

const currencyOptions = [
  {
    code: 'KSH',
    label: 'Ksh',
    price: 'Ksh 10,000',
  },
  {
    code: 'USD',
    label: 'USD',
    price: '$80',
  },
  {
    code: 'NGN',
    label: 'Naira',
    price: '₦112,000',
  },
]

export function InvestmentSection ({ inclusions, onOpenRegistration }) {
  const [selectedCurrency, setSelectedCurrency] = useState('KSH')
  const selectedPrice = currencyOptions.find(
    (option) => option.code === selectedCurrency,
  ).price

  const investmentInclusions = inclusions
    .filter((item) => item !== 'Visionboarding Guide')
    .concat('Access to the Finsmart Assessment')

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
            <p className='price'>{selectedPrice}</p>
            <div className='currency-selector' aria-label='Select currency'>
              {currencyOptions.map((option) => (
                <button
                  key={option.code}
                  type='button'
                  className={
                    option.code === selectedCurrency
                      ? 'currency-button active'
                      : 'currency-button'
                  }
                  aria-pressed={option.code === selectedCurrency}
                  onClick={() => setSelectedCurrency(option.code)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </header>
          <div className='pricing-body'>
            <h3>Everything Included:</h3>
            <ul className='pricing-list'>
              <li>
                <span className='check' aria-hidden='true'>✓</span>
                <span>Full-day guided clarity experience</span>
              </li>
              {investmentInclusions.map((item) => (
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
