import Link from 'next/link'
import { useState } from 'react'

export default function PublicLayout({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen flex flex-col">
      <header className="h-[78px] border-b sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
          {/* Mobile */}
          <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="menu">
            ☰
          </button>
          {/* Left nav */}
          <nav className="hidden md:flex gap-6 no-wrap">
            <Link href="/shop">SHOP</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/usage-guide">HOW TO USE</Link>
          </nav>
          {/* Logo center */}
          <Link href="/" className="text-xl font-semibold">Brand</Link>
          {/* Right nav */}
          <nav className="hidden md:flex gap-6 no-wrap items-center">
            <Link href="/support">SUPPORT</Link>
            <SearchButton />
            <Link href="/cart">CART</Link>
            <Link href="/account">ACCOUNT</Link>
          </nav>
          {/* Mobile right icons */}
          <div className="md:hidden flex items-center gap-3">
            <SearchButton />
            <Link href="/cart">🛒</Link>
          </div>
        </div>
        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t p-4 space-y-3">
            <Link href="/shop" onClick={() => setOpen(false)}>SHOP</Link>
            <Link href="/about" onClick={() => setOpen(false)}>ABOUT</Link>
            <Link href="/usage-guide" onClick={() => setOpen(false)}>HOW TO USE</Link>
            <Link href="/support" onClick={() => setOpen(false)}>SUPPORT</Link>
            <Link href="/account" onClick={() => setOpen(false)}>ACCOUNT</Link>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="h-[120px] border-t flex items-center">
        <div className="max-w-6xl mx-auto w-full px-4 flex flex-wrap justify-between text-sm">
          <div className="flex gap-4">
            <Link href="/company">회사 소개</Link>
            <Link href="/brand">브랜드 철학</Link>
            <Link href="/privacy">개인정보처리방침</Link>
            <Link href="/terms">이용약관</Link>
          </div>
          <div className="text-gray-500">© {new Date().getFullYear()} Brand</div>
        </div>
      </footer>
    </div>
  )
}

function SearchButton() {
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  return (
    <div className="relative">
      <button className="px-2 py-1 border rounded" onClick={() => setOpen((v) => !v)}>
        SEARCH
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 w-64">
          <form action={`/shop?q=${encodeURIComponent(q)}`} onSubmit={(e) => {}}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="상품명/옵션명 검색"
              className="w-full border px-2 py-1"
            />
          </form>
        </div>
      )}
    </div>
  )
}
