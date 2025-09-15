import { useId } from 'react'

export default function TextArea({ label, description, error, rows = 4, className = '', textareaClassName = '', ...props }) {
  const id = useId()
  const base = 'block w-full rounded-md border px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black'
  const normal = 'border-gray-300'
  const invalid = 'border-red-300 focus:ring-red-600 focus:border-red-600'
  return (
    <div className={['w-full', className].join(' ')}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-800">
          {label}
        </label>
      )}
      <textarea id={id} rows={rows} className={[base, error ? invalid : normal, textareaClassName].join(' ')} {...props} />
      {description && !error && <p className="mt-1 text-xs text-gray-500">{description}</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )}

