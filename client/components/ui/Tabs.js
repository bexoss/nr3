import { useState } from 'react'

export default function Tabs({ tabs = [], value, onChange, className = '' }) {
  const [internal, setInternal] = useState(tabs[0]?.value)
  const current = value ?? internal
  const set = (v) => {
    if (onChange) onChange(v)
    else setInternal(v)
  }
  return (
    <div className={['w-full', className].join(' ')}>
      <div className="flex gap-2 border-b">
        {tabs.map((t) => {
          const active = current === t.value
          return (
            <button
              key={t.value}
              className={[
                'px-3 py-2 text-sm border-b-2 -mb-px transition-colors',
                active ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800',
              ].join(' ')}
              onClick={() => set(t.value)}
              type="button"
            >
              {t.label}
            </button>
          )
        })}
      </div>
      <div className="pt-3">
        {tabs.map((t) => (
          <div key={t.value} className={current === t.value ? 'block' : 'hidden'}>
            {typeof t.content === 'function' ? t.content() : t.content}
          </div>
        ))}
      </div>
    </div>
  )
}

