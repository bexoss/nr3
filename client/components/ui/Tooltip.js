import { useEffect, useRef, useState } from 'react'

export default function Tooltip({ content, children, side = 'top', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const pos = positionClasses(side)

  return (
    <span className={["relative inline-flex", className].join(' ')}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      ref={ref}
    >
      {children}
      {open && (
        <span role="tooltip" className={[
          'absolute z-50 px-2 py-1 text-xs rounded bg-black text-white shadow whitespace-nowrap',
          pos.container,
        ].join(' ')}>
          {content}
          <span className={['absolute w-2 h-2 bg-black rotate-45', pos.arrow].join(' ')} />
        </span>
      )}
    </span>
  )
}

function positionClasses(side) {
  switch (side) {
    case 'bottom':
      return { container: 'left-1/2 -translate-x-1/2 top-full mt-2', arrow: '-top-1 left-1/2 -translate-x-1/2' }
    case 'left':
      return { container: 'right-full mr-2 top-1/2 -translate-y-1/2', arrow: 'right-[-4px] top-1/2 -translate-y-1/2' }
    case 'right':
      return { container: 'left-full ml-2 top-1/2 -translate-y-1/2', arrow: 'left-[-4px] top-1/2 -translate-y-1/2' }
    case 'top':
    default:
      return { container: 'left-1/2 -translate-x-1/2 bottom-full mb-2', arrow: '-bottom-1 left-1/2 -translate-x-1/2' }
  }
}

