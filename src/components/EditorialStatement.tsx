import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, softBlurReveal, viewOnce } from '../lib/motion'

export function EditorialStatement() {
  const reduced = useReducedMotion()

  return (
    <section className="philosophy" id="philosophy" aria-labelledby="philosophy-title">
      <div className="wrap">
        <div className="philosophy__panel">
          <motion.p
            className="eyebrow"
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={viewOnce}
            variants={softBlurReveal}
          >
            01 / Philosophy
          </motion.p>
          <motion.h2
            id="philosophy-title"
            className="display-title"
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={viewOnce}
            variants={fadeUp}
          >
            PRECISION
            <span className="display-serif">without noise.</span>
          </motion.h2>
          <motion.p
            className="lead"
            initial={reduced ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={viewOnce}
            variants={fadeUp}
          >
            CHRONO 01 removes everything that does not serve the measurement of time. Every surface,
            proportion and movement exists for a reason.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
