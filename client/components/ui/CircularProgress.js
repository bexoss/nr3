export default function CircularProgress({ size = 'md', color = 'black', className = '', label = 'Loading…' }) {
  const sizes = {
    xs: 'h-4 w-4 border-2',
    sm: 'h-5 w-5 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-2',
    xl: 'h-10 w-10 border-2',
  }
  const dim = sizes[size] || sizes.md
  const colorClass = colorClassName(color)
  return (
    <span role="status" aria-label={label} className={["inline-flex items-center", className].join(' ')}>
      <span className={["rounded-full animate-spin border-transparent border-t-current", dim, colorClass].join(' ')} />
    </span>
  )
}

function colorClassName(color) {
  switch (color) {
    case 'white':
      return 'text-white'
    case 'gray':
      return 'text-gray-700'
    case 'red':
      return 'text-red-600'
    case 'blue':
      return 'text-blue-600'
    case 'green':
      return 'text-green-600'
    case 'black':
    default:
      return 'text-black'
  }
}

