export default function Progress({ value = 0, max = 100, className = '' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={["w-full h-2 rounded bg-gray-200 overflow-hidden", className].join(' ')} role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full bg-black" style={{ width: pct + '%' }} />
    </div>
  )
}

