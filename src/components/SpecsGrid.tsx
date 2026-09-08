import { motion, useReducedMotion } from 'framer-motion'
import { SPECS } from '../data/watch'
import { fadeUp, staggerContainer, viewOnce } from '../lib/motion'
import { usePointerLight } from '../hooks/usePointerLight'

export function SpecsGrid() {
  const reduced = useReducedMotion()
  const { onPointerMove, onPointerLeave } = usePointerLight()

  return (
    <section className="engineering" id="engineering" aria-labelledby="engineering-title">
      <div className="wrap">
        <div className="engineering__header">
          <h2 id="engineering-title" className="eyebrow">
            02 / Engineering
          </h2>
        </div>
        <motion.div
          className="specs"
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={viewOnce}
          variants={staggerContainer}
        >
          {SPECS.map((spec) => (
            <motion.article
              className="spec spotlight"
              key={spec.value}
              variants={fadeUp}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
            >
              <strong className="spec__value">{spec.value}</strong>
              <span className="spec__rule" aria-hidden="true" />
              <span className="spec__label">{spec.label}</span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
