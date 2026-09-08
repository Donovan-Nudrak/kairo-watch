const HOURS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

function HourMarks() {
  return (
    <>
      {HOURS.map((hour) => {
        const angle = hour * 30
        return (
          <line
            key={hour}
            x1="210"
            y1="22"
            x2="210"
            y2={hour % 3 === 0 ? 38 : 30}
            transform={`rotate(${angle} 210 210)`}
            className={hour % 3 === 0 ? 'orbit-mark orbit-mark--major' : 'orbit-mark'}
          />
        )
      })}
    </>
  )
}

export function HeroOrbit() {
  return (
    <div className="hero__orbit" aria-hidden="true">
      <div className="orbit-spin orbit-spin--slow">
        <svg className="hero__orbit-svg" viewBox="0 0 420 420">
          <circle cx="210" cy="210" r="188" className="orbit-ring" />
          <HourMarks />
        </svg>
      </div>
      <div className="orbit-spin orbit-spin--reverse">
        <svg className="hero__orbit-svg" viewBox="0 0 420 420">
          <circle cx="210" cy="210" r="148" className="orbit-ring orbit-ring--inner" />
        </svg>
      </div>
      <div className="second-hand">
        <svg className="hero__orbit-svg" viewBox="0 0 420 420">
          <line x1="210" y1="210" x2="210" y2="38" />
          <circle cx="210" cy="210" r="2.4" />
        </svg>
      </div>
    </div>
  )
}
