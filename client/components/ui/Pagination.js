export default function Pagination({ page = 1, total = 1, onChange, className = '' }) {
  if (total < 1) total = 1
  const canPrev = page > 1
  const canNext = page < total
  const go = (p) => onChange && onChange(Math.min(Math.max(1, p), total))

  // window of pages
  const window = 5
  const start = Math.max(1, page - Math.floor(window / 2))
  const end = Math.min(total, start + window - 1)
  const pages = []
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className={['flex items-center gap-[5px] text-xs', className].join(' ')} aria-label="Pagination">
      <button
        className={btnClass(!canPrev)}
        onClick={() => canPrev && go(1)}
      >
        «
      </button>
      <button
        className={btnClass(!canPrev)}
        onClick={() => canPrev && go(page - 1)}
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          className={[
            'h-8 w-8 grid place-items-center rounded-full border',
            p === page ? 'bg-black text-white border-black' : 'border-gray-300 hover:bg-gray-100',
          ].join(' ')}
          onClick={() => go(p)}
        >
          {p}
        </button>
      ))}
      <button
        className={btnClass(!canNext)}
        onClick={() => canNext && go(page + 1)}
      >
        ›
      </button>
      <button
        className={btnClass(!canNext)}
        onClick={() => canNext && go(total)}
      >
        »
      </button>
    </nav>
  )
}

function btnClass(disabled) {
  return [
    'h-8 min-w-[2rem] px-2 rounded border border-gray-300 text-gray-700',
    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100',
  ].join(' ')
}
