import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import type { Finish } from '../data/watch'
import { WATCH } from '../data/watch'
import { modalSpring } from '../lib/motion'

type ReservationModalProps = {
  open: boolean
  finish: Finish
  onClose: () => void
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function ReservationModal({ open, finish, onClose }: ReservationModalProps) {
  const reduced = useReducedMotion()
  const titleId = useId()
  const descId = useId()
  const errorId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!open) return

    previousFocus.current = document.activeElement as HTMLElement | null
    document.body.classList.add('modal-open')

    const focusTimer = window.setTimeout(() => {
      closeRef.current?.focus()
    }, 20)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.classList.remove('modal-open')
      previousFocus.current?.focus()
    }
  }, [open, onClose])

  const resetForm = () => {
    setEmail('')
    setError('')
    setSubmitted(false)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = email.trim()

    if (!EMAIL_PATTERN.test(value)) {
      setError('Enter a valid email address.')
      return
    }

    setError('')
    setSubmitted(true)
    queueMicrotask(() => closeRef.current?.focus())
  }

  return createPortal(
    <AnimatePresence onExitComplete={resetForm}>
      {open ? (
        <motion.div
          className="modal-backdrop"
          onClick={onClose}
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <motion.div
            ref={dialogRef}
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            onClick={(event) => event.stopPropagation()}
            initial={reduced ? false : { opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={reduced ? { duration: 0.2 } : modalSpring}
          >
            <button
              ref={closeRef}
              type="button"
              className="modal__close"
              onClick={onClose}
              aria-label="Close reservation"
            >
              <X size={16} strokeWidth={1.4} aria-hidden="true" />
            </button>

            <p className="eyebrow modal__eyebrow">Concept reservation</p>
            <h2 id={titleId}>{WATCH.model}</h2>

            <dl className="modal__facts">
              <div>
                <dt>Finish</dt>
                <dd>
                  {finish.name} · {finish.reference}
                </dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>{WATCH.price}</dd>
              </div>
            </dl>

            {submitted ? (
              <div className="modal-success" role="status">
                <h3>REQUEST RECEIVED</h3>
                <p id={descId}>This is a concept reservation. No payment has been processed.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="reservation-email">Email</label>
                  <input
                    id="reservation-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    aria-invalid={error ? true : undefined}
                    aria-describedby={error ? errorId : descId}
                    onChange={(event) => {
                      setEmail(event.target.value)
                      if (error) setError('')
                    }}
                  />
                </div>
                <p className="form-error" id={errorId} role="alert">
                  {error}
                </p>
                <button type="submit" className="btn btn--fill">
                  Request reservation
                  <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
                </button>
                <p className="modal__disclaimer" id={descId}>
                  This is not a purchase. Your details stay in the browser and are never sent to a
                  server.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}
