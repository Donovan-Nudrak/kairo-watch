import { motion, useReducedMotion } from 'framer-motion'
import { CRAFT_POINTS, IMAGES } from '../data/watch'
import { fadeScale, fadeUp, viewOnce } from '../lib/motion'
import { CampaignImage } from './CampaignImage'

export function CraftSection() {
  const reduced = useReducedMotion()

  return (
    <section className="craft" aria-labelledby="craft-title">
      <motion.div
        className="craft__media"
        initial={reduced ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={viewOnce}
        variants={fadeScale}
      >
        <div className="craft__frame">
          <CampaignImage
            src={IMAGES.craft.src}
            fallback={IMAGES.craft.fallback}
            alt={IMAGES.craft.alt}
          />
        </div>
      </motion.div>
      <div className="craft__content">
        <p className="eyebrow">03 / Construction</p>
        <motion.h2
          id="craft-title"
          className="display-title"
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={viewOnce}
          variants={fadeUp}
        >
          BUILT TO
          <span className="display-serif">outlast the moment.</span>
        </motion.h2>
        <motion.p
          className="lead"
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={viewOnce}
          variants={fadeUp}
        >
          Machined from aerospace-grade titanium, protected by sapphire crystal and driven by a
          self-winding mechanical movement.
        </motion.p>
        <ul className="craft__points">
          {CRAFT_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
