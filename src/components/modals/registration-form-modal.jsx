import './registration-form-modal.css'

export function RegistrationFormModal ({
  formData,
  isSubmitting,
  submitError,
  onChange,
  onClose,
  onSubmit,
}) {
  return (
    <div className='modal-overlay' role='dialog' aria-modal='true'>
      <div className='registration-modal'>
        <div className='registration-modal-header'>
          <button
            type='button'
            className='registration-close'
            onClick={onClose}
            aria-label='Close modal'
            disabled={isSubmitting}
          >
            ×
          </button>
          <div className='registration-star' aria-hidden='true'>✧</div>
          <h3>Registration Form</h3>
          <p>Ladies Clarity & Visionboard Workshop</p>
        </div>

        <form className='registration-modal-body' onSubmit={onSubmit}>
          <label htmlFor='fullName'>Full Name</label>
          <input
            id='fullName'
            name='fullName'
            type='text'
            value={formData.fullName}
            onChange={onChange}
            placeholder='Enter your full name'
            required
            disabled={isSubmitting}
          />

          <label htmlFor='emailAddress'>Email Address</label>
          <input
            id='emailAddress'
            name='emailAddress'
            type='email'
            value={formData.emailAddress}
            onChange={onChange}
            placeholder='Enter your email address'
            required
            disabled={isSubmitting}
          />

          <label htmlFor='phoneNumber'>Phone Number</label>
          <input
            id='phoneNumber'
            name='phoneNumber'
            type='tel'
            value={formData.phoneNumber}
            onChange={onChange}
            placeholder='Enter your phone number'
            disabled={isSubmitting}
          />

          <label htmlFor='workshopDay'>Preferred Workshop Day</label>
          <select
            id='workshopDay'
            name='workshopDay'
            value={formData.workshopDay}
            onChange={onChange}
            required
            disabled={isSubmitting}
          >
            <option value=''>Select a workshop day</option>
            <option value='18th July 2026'>18th July 2026</option>
            <option value='19th July 2026'>19th July 2026</option>
          </select>

          <button type='submit' className='registration-submit' disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Registration'}
          </button>
          {submitError && <p className='registration-error'>{submitError}</p>}
          <p className='registration-note'>
            Your information will be sent securely to the workshop organizers.
          </p>
        </form>
      </div>
    </div>
  )
}
