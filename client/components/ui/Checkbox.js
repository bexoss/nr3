import { useId } from 'react'

export default function Checkbox({ label, checked, onChange, className = '', disabled, ...props }) {
  const id = useId()
  return (
    <label htmlFor={id} className={["inline-flex items-center gap-2", disabled ? 'opacity-50' : '', className].join(' ')}>
      <input
        id={id}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
      </label>
  )
}
