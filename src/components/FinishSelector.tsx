import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { CSSProperties } from 'react'
import { FINISH_ORDER, FINISHES, IMAGES, WATCH, type FinishId } from '../data/watch'
import { usePointerLight } from '../hooks/usePointerLight'
import { easePremium, fadeUp, viewOnce } from '../lib/motion'
import { CampaignImage } from './CampaignImage'

type FinishSelectorProps = {
  finishId: FinishId
  onFinishChange: (id: FinishId) => void
  onReserve: () => void
}

export function FinishSelector({ finishId, onFinishChange, onReserve }: FinishSelectorProps) {
  const reduced = useReducedMotion()
  const finish = FINISHES[finishId]
  const { onPointerMove, onPointerLeave } = usePointerLight()

  return (
    <section
      className="editions"
      id="editions"
      aria-labelledby="editions-title"
      style={{ '--finish-accent': finish.accent } as CSSProperties}
    >
      <div className="wrap">
        <motion.div
          className="editions__intro"
          initial={reduced ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={viewOnce}
          variants={fadeUp}
        >
          <p className="eyebrow">04 / Editions</p>
          <h2 id="editions-title" className="display-title">
            CHOOSE YOUR
            <span className="display-serif">finish.</span>
          </h2>
        </motion.div>

        <div className="editions__grid">
          <motion.div
            className={`editions__media spotlight is-${finish.id}`}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            initial={reduced ? false : { opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewOnce}
            transition={{ duration: 0.8, ease: easePremium }}
          >
            <div className="editions__halo" />
            <motion.div
              key={finish.id}
              initial={reduced ? false : { opacity: 0.55 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: easePremium }}
              style={{ height: '100%' }}
            >
              <CampaignImage
                src={IMAGES.detail.src}
                fallback={IMAGES.detail.fallback}
                alt={`${IMAGES.detail.alt}, ${finish.name} finish`}
              />
            </motion.div>
            <div className="editions__wash" />
          </motion.div>

          <div className="editions__panel">
            <LayoutGroup>
              <div className="finish-list" role="radiogroup" aria-label="Watch finish">
                {FINISH_ORDER.map((id) => {
                  const option = FINISHES[id]
                  const selected = id === finishId
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      className={selected ? 'finish-option is-active' : 'finish-option'}
                      onClick={() => onFinishChange(id)}
                      aria-checked={selected}
                    >
                      {selected ? (
                        <motion.span
                          className="finish-option__indicator"
                          layoutId="finish-indicator"
                          transition={{ duration: 0.45, ease: easePremium }}
                        />
                      ) : null}
                      <span
                        className="finish-swatch"
                        style={{ '--swatch': option.swatch } as CSSProperties}
                        aria-hidden="true"
                      />
                      <span className="finish-option__name">{option.name}</span>
                      <span className="finish-option__ref">{option.reference}</span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>

            <AnimatePresence mode="wait">
              <motion.div
                className="finish-meta"
                key={finish.id}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: easePremium }}
              >
                <h3 className="finish-meta__name">{finish.name}</h3>
                <p className="finish-meta__ref">{finish.reference}</p>
                <p className="finish-meta__note">
                  {finish.colorLabel}. {finish.note}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="finish-price">
              <span>
                Edition price <strong>{WATCH.price}</strong>
              </span>
              <button type="button" className="btn btn--fill" onClick={onReserve}>
                Reserve this edition
                <ArrowRight size={15} strokeWidth={1.6} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
