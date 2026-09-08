import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { IMAGES, WATCH } from '../data/watch'
import { easePremium } from '../lib/motion'
import { CampaignImage } from './CampaignImage'
import { HeroOrbit } from './HeroOrbit'

export function Hero() {
  const reduced = useReducedMotion()

  return (
    <motion.section
      className="hero"
      id="timepiece"
      aria-labelledby="hero-title"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: easePremium }}
    >
      <div className="hero__glow" />

      <div className="hero__visual">
        <motion.div
          className="hero__cluster"
          initial={reduced ? false : { scale: 1.06, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.15, ease: easePremium }}
        >
          <HeroOrbit />
          <div className="hero__stage">
            <CampaignImage
              src={IMAGES.hero.src}
              fallback={IMAGES.hero.fallback}
              alt={IMAGES.hero.alt}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <motion.div
            className="hero__chips"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05, ease: easePremium }}
          >
            <span className="hero__chip hero__chip--auto">Automatic / 72H</span>
            <span className="hero__chip hero__chip--grade">Grade 5 titanium</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="hero__inner">
        <div className="hero__copy">
          <motion.p
            className="eyebrow"
            initial={reduced ? false : { opacity: 0, filter: 'blur(8px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.65, delay: 0.18, ease: easePremium }}
          >
            KAIRO / Independent horology
          </motion.p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__title-line">
              <motion.span
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.22, ease: easePremium }}
              >
                CHRONO
              </motion.span>
            </span>
            <span className="hero__title-line hero__title-line--index">
              <motion.span
                initial={reduced ? false : { y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, delay: 0.34, ease: easePremium }}
              >
                / 01
              </motion.span>
            </span>
          </h1>
          <motion.p
            className="hero__kicker"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: easePremium }}
          >
            Time, reduced to its essential form.
          </motion.p>
          <motion.p
            className="hero__body"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: easePremium }}
          >
            A titanium automatic watch engineered for clarity, endurance and absolute restraint.
          </motion.p>
          <motion.div
            className="hero__actions"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: easePremium }}
          >
            <a className="btn btn--fill" href="#philosophy">
              Explore the watch
              <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <ul className="hero__meta">
              <li>{WATCH.caliber}</li>
              <li>{WATCH.diameter}</li>
              <li>{WATCH.shortPrice}</li>
            </ul>
          </motion.div>
        </div>

        <a className="hero__scroll" href="#philosophy">
          Scroll
          <ChevronDown size={14} strokeWidth={1.4} aria-hidden="true" />
        </a>
      </motion.div>
    </motion.section>
  )
}
