import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { IMAGES } from '../data/watch'
import { fadeUp, viewOnce } from '../lib/motion'
import { CampaignImage } from './CampaignImage'

type ClosingSectionProps = {
  onReserve: () => void
}

export function ClosingSection({ onReserve }: ClosingSectionProps) {
  const reduced = useReducedMotion()

  return (
    <section className="closing" aria-labelledby="closing-title">
      <div className="closing__media">
        <CampaignImage
          src={IMAGES.wrist.src}
          fallback={IMAGES.wrist.fallback}
          alt={IMAGES.wrist.alt}
        />
      </div>
      <div className="closing__overlay" />
      <div className="wrap closing__inner">
        <motion.h2
          id="closing-title"
          className="display-title"
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={viewOnce}
          variants={fadeUp}
        >
          TIME BELONGS
          <span className="display-serif">to those who</span>
          DESIGN IT.
        </motion.h2>
        <div className="closing__caption">
          <strong>KAIRO CHRONO 01</strong>
          <span>An independent study in mechanical time.</span>
        </div>
        <div className="closing__actions">
          <button type="button" className="btn btn--fill" onClick={onReserve}>
            Reserve Chrono 01
            <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  )
}
