import { useState } from 'react'

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen md:grid md:grid-cols-[220px_1fr]">
      {/* Sidebar - desktop */}
      <aside className="hidden md:block border-r p-4 space-y-2">
        <h2 className="font-semibold">Admin</h2>
        <NavLinks />
      </aside>

      {/* Mobile slide-over */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-72 bg-white shadow p-4 space-y-2">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-semibold">Admin</h2>
              <button className="px-2 py-1 border rounded" onClick={() => setOpen(false)} aria-label="close">
                ✕
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-col min-h-screen md:min-h-0">
        <header className="h-12 border-b flex items-center px-4 gap-3">
          <button className="md:hidden px-2 py-1 border rounded" onClick={() => setOpen(true)} aria-label="menu">
            ☰
          </button>
          <span className="font-medium">Dashboard</span>
        </header>
        <main className="flex-1 p-4">{children}</main>
        <footer className="h-12 border-t flex items-center justify-center text-sm text-gray-500">
          Appton Inc.
        </footer>
      </div>
    </div>
  )
}

function NavLinks({ onNavigate }) {
  const handle = () => onNavigate && onNavigate()
  return (
    <nav className="flex flex-col gap-2 text-sm">
      <a href="/admin/products" onClick={handle}>Products</a>
      <a href="/admin/users" onClick={handle}>Users</a>
      <a href="/admin/orders" onClick={handle}>Orders</a>
      <a href="/admin/campaigns" onClick={handle}>Campaigns</a>
    </nav>
  )
}
