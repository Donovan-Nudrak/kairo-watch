import { useCallback, useEffect, useState } from 'react'
import { ClosingSection } from './components/ClosingSection'
import { CraftSection } from './components/CraftSection'
import { EditorialStatement } from './components/EditorialStatement'
import { FinishSelector } from './components/FinishSelector'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ReservationModal } from './components/ReservationModal'
import { ScrollProgress } from './components/ScrollProgress'
import { SpecsGrid } from './components/SpecsGrid'
import { FINISHES, type FinishId } from './data/watch'

function App() {
  const [finishId, setFinishId] = useState<FinishId>('obsidian')
  const [modalOpen, setModalOpen] = useState(false)

  const openReserve = useCallback(() => setModalOpen(true), [])
  const closeReserve = useCallback(() => setModalOpen(false), [])

  useEffect(() => {
    const onVisibility = () => {
      document.documentElement.classList.toggle('is-hidden', document.hidden)
    }
    onVisibility()
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  return (
    <>
      <ScrollProgress />
      <Header onReserve={openReserve} />
      <main>
        <Hero />
        <EditorialStatement />
        <SpecsGrid />
        <CraftSection />
        <FinishSelector
          finishId={finishId}
          onFinishChange={setFinishId}
          onReserve={openReserve}
        />
        <ClosingSection onReserve={openReserve} />
      </main>
      <Footer />
      <ReservationModal open={modalOpen} finish={FINISHES[finishId]} onClose={closeReserve} />
    </>
  )
}

export default App
