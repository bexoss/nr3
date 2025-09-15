// Fluent UI-like type ramp
// Display, Title, Subtitle, Body, Caption

export function Display({ children, className = '' }) {
  return <h1 className={["text-3xl md:text-4xl font-semibold leading-tight tracking-normal", className].join(' ')}>{children}</h1>
}

export function Title1({ children, className = '' }) {
  return <h2 className={["text-2xl font-semibold leading-tight tracking-normal", className].join(' ')}>{children}</h2>
}

export function Title2({ children, className = '' }) {
  return <h3 className={["text-xl font-semibold leading-snug tracking-normal", className].join(' ')}>{children}</h3>
}

export function Subtitle1({ children, className = '' }) {
  return <p className={["text-lg font-medium leading-snug text-gray-700", className].join(' ')}>{children}</p>
}

export function Body1({ children, className = '' }) {
  return <p className={["text-sm leading-7 text-gray-900", className].join(' ')}>{children}</p>
}

export function Body2({ children, className = '' }) {
  return <p className={["text-xs leading-6 text-gray-900", className].join(' ')}>{children}</p>
}

export function Caption1({ children, className = '' }) {
  return <span className={["text-[11px] leading-5 text-gray-600", className].join(' ')}>{children}</span>
}

// Backward-compatible aliases
export function H1({ children, className = '' }) {
  return <Title1 className={className}>{children}</Title1>
}

export function H2({ children, className = '' }) {
  return <Title2 className={className}>{children}</Title2>
}

export function P({ children, className = '' }) {
  return <Body1 className={className}>{children}</Body1>
}

export function Muted({ children, className = '' }) {
  return <p className={["text-sm text-gray-500", className].join(' ')}>{children}</p>
}
