import './registration-success-modal.css'

export function RegistrationSuccessModal ({ workshopDay, onClose }) {
  return (
    <div className='modal-overlay' role='dialog' aria-modal='true'>
      <div className='success-modal'>
        <div className='success-modal-header'>
          <button
            type='button'
            className='success-close'
            onClick={onClose}
            aria-label='Close modal'
          >
            ×
          </button>
          <div className='success-star' aria-hidden='true'>✧</div>
          <h3>Registration Form</h3>
          <p>Ladies Clarity & Visionboard Workshop</p>
        </div>

        <div className='success-modal-body'>
          <div className='success-icon' aria-hidden='true'>✓</div>
          <h4>Registration Submitted!</h4>
          <p>
            Thank you for registering for the Ladies Clarity & Visionboard
            Workshop. Your details have been sent to the workshop organizers.
            You will receive a confirmation shortly.
          </p>
          <p>
            We look forward to seeing you on <strong>{workshopDay}!</strong>
          </p>
          <button type='button' className='success-action' onClick={onClose}>
            Close & Return to Page
          </button>
        </div>
      </div>
    </div>
  )
}
