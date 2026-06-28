import { useEffect, useState } from 'react'
import './App.css'
import { DifferenceSection } from './components/difference-section'
import { FinalCtaSection } from './components/final-cta-section'
import { ForYouSection } from './components/for-you-section'
import { HeroSection } from './components/hero-section'
import { IncludedSection } from './components/included-section'
import { InvestmentSection } from './components/investment-section'
import { ResetSection } from './components/reset-section'
import { SiteFooter } from './components/site-footer'
import { SocialProofSection } from './components/social-proof-section'
import { TransformationSection } from './components/transformation-section'
import { RegistrationFormModal } from './components/modals/registration-form-modal'
import { RegistrationSuccessModal } from './components/modals/registration-success-modal'
import {
  differenceItems,
  eventDate,
  inclusions,
  outcomes,
  testimonials,
  workshopHighlights,
} from './data/workshop-data'
import { useCountdown } from './hooks/use-countdown'

function App () {
  const countdownItems = useCountdown(eventDate)
  const [activeModal, setActiveModal] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [registeredWorkshopDay, setRegisteredWorkshopDay] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    phoneNumber: '',
    workshopDay: '',
  })

  useEffect(() => {
    document.title = 'Ladies Clarity & Visionboard Workshop'
  }, [])

  const handleOpenRegistration = () => {
    setSubmitError('')
    setRegisteredWorkshopDay('')
    setActiveModal('form')
  }

  const handleCloseModal = () => {
    setActiveModal(null)
    setSubmitError('')
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRegistrationSubmit = (event) => {
    event.preventDefault()

    const submitRegistration = async () => {
      setIsSubmitting(true)
      setSubmitError('')

      try {
        const response = await fetch('/api/registrations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          throw new Error(data?.message || 'Could not submit registration')
        }

        setRegisteredWorkshopDay(formData.workshopDay)
        setActiveModal('success')
        setFormData({
          fullName: '',
          emailAddress: '',
          phoneNumber: '',
          workshopDay: '',
        })
      } catch (error) {
        setSubmitError(error.message)
      } finally {
        setIsSubmitting(false)
      }
    }

    submitRegistration()
  }

  return (
    <main className='page'>
      <HeroSection
        countdownItems={countdownItems}
        onOpenRegistration={handleOpenRegistration}
      />
      <ResetSection workshopHighlights={workshopHighlights} />
      <TransformationSection outcomes={outcomes} />
      <DifferenceSection differenceItems={differenceItems} />
      <ForYouSection onOpenRegistration={handleOpenRegistration} />
      <InvestmentSection
        inclusions={inclusions}
        onOpenRegistration={handleOpenRegistration}
      />
      <SocialProofSection testimonials={testimonials} />
      <IncludedSection inclusions={inclusions} />
      <FinalCtaSection
        countdownItems={countdownItems}
        onOpenRegistration={handleOpenRegistration}
      />
      <SiteFooter />
      {activeModal === 'form' && (
        <RegistrationFormModal
          formData={formData}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onChange={handleFormChange}
          onClose={handleCloseModal}
          onSubmit={handleRegistrationSubmit}
        />
      )}
      {activeModal === 'success' && (
        <RegistrationSuccessModal
          workshopDay={registeredWorkshopDay}
          onClose={handleCloseModal}
        />
      )}
    </main>
  )
}

export default App
