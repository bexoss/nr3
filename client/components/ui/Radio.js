import { useId } from 'react'

export default function Radio({ name, label, checked, onChange, className = '', disabled, value, ...props }) {
  const id = useId()
  return (
    <label htmlFor={id} className={["inline-flex items-center gap-2", disabled ? 'opacity-50' : '', className].join(' ')}>
      <input
        id={id}
        type="radio"
        name={name}
        className="h-4 w-4 border-gray-300 text-black focus:ring-black"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        value={value}
        {...props}
      />
      {label && <span className="text-sm">{label}</span>}
      </label>
  )
}
