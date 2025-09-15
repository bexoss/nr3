export default function Alert({ variant = 'info', title, children, className = '', icon }) {
  const styles = {
    info: 'bg-blue-50 text-blue-900 border-blue-200',
    success: 'bg-green-50 text-green-900 border-green-200',
    warning: 'bg-yellow-50 text-yellow-900 border-yellow-200',
    error: 'bg-red-50 text-red-900 border-red-200',
  }

  const Icon = icon ?? variantIcon(variant)

  return (
    <div
      role="status"
      className={[
        'flex items-center gap-2 border rounded-md px-3 py-2 whitespace-nowrap overflow-hidden text-ellipsis text-sm',
        styles[variant],
        className,
      ].join(' ')}
    >
      <Icon className="shrink-0" />
      {title ? <span className="font-medium">{title}</span> : null}
      {children ? <span className="opacity-90">{children}</span> : null}
    </div>
  )
}

function variantIcon(variant) {
  const common = 'w-4 h-4'
  switch (variant) {
    case 'success':
      return ({ className = '' }) => (
        <svg className={[common, className].join(' ')} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm3.53-9.78a.75.75 0 0 0-1.06-1.06L9 10.62 7.53 9.16a.75.75 0 1 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4-4Z" />
        </svg>
      )
    case 'warning':
      return ({ className = '' }) => (
        <svg className={[common, className].join(' ')} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l6.518 11.59c.75 1.334-.213 3.01-1.742 3.01H3.48c-1.53 0-2.492-1.676-1.743-3.01L8.257 3.1ZM10 7.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0V8.25A.75.75 0 0 0 10 7.5Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>
      )
    case 'error':
      return ({ className = '' }) => (
        <svg className={[common, className].join(' ')} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-5a1 1 0 1 0 2 0 1 1 0 0 0-2 0Zm.25-6.75a.75.75 0 1 0-1.5 0v4a.75.75 0 0 0 1.5 0v-4Z" />
        </svg>
      )
    case 'info':
    default:
      return ({ className = '' }) => (
        <svg className={[common, className].join(' ')} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM9 9.5a1 1 0 1 1 2 0V14a1 1 0 1 1-2 0V9.5Zm1-4a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5Z" />
        </svg>
      )
  }
}
