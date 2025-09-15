import { useEffect } from 'react'

export default function Dialog({ open, onClose, title, children, footer }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose?.()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {title && <div className="px-4 py-3 border-b text-base font-semibold">{title}</div>}
        <div className="p-4">{children}</div>
        {footer && <div className="px-4 py-3 border-t bg-gray-50 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  )
}
