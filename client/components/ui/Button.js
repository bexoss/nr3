export default function Button({ variant = 'primary', size = 'md', children, className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
  const sizes = {
    sm: 'h-8 px-3 text-[11px]',
    md: 'h-10 px-4 text-xs',
    lg: 'h-12 px-6 text-sm',
  }
  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 focus:ring-black',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-400',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-50 focus:ring-gray-400',
    ghost: 'text-gray-900 hover:bg-gray-100 focus:ring-gray-400',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
  }
  return (
    <button className={[base, sizes[size], variants[variant], className].join(' ')} {...props}>
      {children}
    </button>
  )
}
