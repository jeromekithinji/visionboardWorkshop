import { useEffect, useMemo, useState } from 'react'

function getCountdown (eventDate) {
  const now = new Date()
  const distance = eventDate.getTime() - now.getTime()

  if (distance <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    }
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  }
}

export function useCountdown (eventDate) {
  const [countdown, setCountdown] = useState(() => getCountdown(eventDate))

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown(eventDate))
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [eventDate])

  return useMemo(
    () => [
      { label: 'Days', value: countdown.days },
      { label: 'Hours', value: countdown.hours },
      { label: 'Minutes', value: countdown.minutes },
      { label: 'Seconds', value: countdown.seconds },
    ],
    [countdown],
  )
}
