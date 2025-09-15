import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Button from './ui/Button'
import Input from './ui/Input'
import { apiGet } from '../lib/api'

export default function PublicLayout({
  children,
  transparentHeader = false,
  hideTopNotice = false,
  headerSlot = null,
}) {
  const [open, setOpen] = useState(false)
  const [hoverProducts, setHoverProducts] = useState(false)
  const [topNotices, setTopNotices] = useState([])
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'
  const [me, setMe] = useState(null)

  // Fetch top notice
  // Top notices and auth state via TanStack Query
  const { data: noticesData } = useQuery({
    queryKey: ['notices', { showOnTop: 1, active: 1, limit: 5 }],
    queryFn: () => apiGet('/notices?showOnTop=1&active=1&limit=5'),
  })
  const { data: meData } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => apiGet('/auth/me'),
  })
  useEffect(() => {
    setTopNotices(Array.isArray(noticesData) ? noticesData : [])
  }, [noticesData])
  useEffect(() => {
    setMe(meData?.user || null)
  }, [meData])

  // Removed rotation/animation per request
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top notice bar */}
      {!hideTopNotice && topNotices.length > 0 && (
        <div className="h-10 w-full bg-black text-white text-xs flex items-center">
          <div className="max-w-6xl mx-auto w-full px-4 flex justify-center">
            <Link
              href={`/notices/${topNotices[0]._id}`}
              className="hover:underline truncate block text-center max-w-full"
            >
              {topNotices[0].title}
            </Link>
          </div>
        </div>
      )}
      <header
        className={[
          headerSlot ? 'relative z-10' : 'sticky top-0 z-10',
          transparentHeader || headerSlot ? 'bg-transparent' : 'bg-white border-b',
        ].join(' ')}
        onMouseLeave={() => setHoverProducts(false)}
      >
        {headerSlot ? (
          <div className="relative">
            {/* Hero in normal flow to paint background up to nav */}
            <div>{headerSlot}</div>
            {/* Nav overlays on top of hero */}
            <div className="absolute inset-x-0 top-0">
              <div className="max-w-6xl mx-auto h-[78px] px-4 flex items-center justify-between relative">
                {/* Mobile */}
                <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="menu">
                  MENU
                </button>
                {/* Left nav */}
                <nav className="hidden md:flex gap-6 no-wrap items-center">
                  <Link href="/collections">Products</Link>
                  <Link href="/about">Brand</Link>
                  <Link href="/guide">Guide</Link>
                </nav>
                {/* Logo center */}
                <Link href="/" className="text-xl logo-font absolute left-1/2 -translate-x-1/2">
                  NANO RECIPE.
                </Link>
                {/* Right nav */}
                <nav className="hidden md:flex gap-4 no-wrap items-center">
                  <SearchButton />
                  <IconLink href="/cart" ariaLabel="Cart" icon="cart" />
                  {me ? (
                    <IconLink href="/me" ariaLabel="My Page" icon="user" />
                  ) : (
                    <IconLink href="/login" ariaLabel="Login" icon="user" />
                  )}
                </nav>
                {/* Mobile right icons */}
                <div className="md:hidden flex items-center gap-3">
                  <SearchButton />
                  <Link href="/cart">CART</Link>
                </div>
              </div>
              {/* Products hover submenu removed per request */}
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto h-[78px] px-4 flex items-center justify-between relative">
            {/* Mobile */}
            <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="menu">
              MENU
            </button>
            {/* Left nav */}
            <nav className="hidden md:flex gap-6 no-wrap items-center">
             <Link href="/collections">Products</Link>
                <Link href="/about">Brand</Link>
                <Link href="/guide">Guide</Link>
            </nav>
            {/* Products hover submenu removed per request */}
            {/* Logo center (true centered, independent of side widths) */}
            <Link href="/" className="text-xl logo-font absolute left-1/2 -translate-x-1/2">
              NANO RECIPE.
            </Link>
            {/* Right nav */}
            <nav className="hidden md:flex gap-4 no-wrap items-center">
              <Link href="/support">SUPPORT</Link>
              <SearchButton />
              <IconLink href="/cart" ariaLabel="Cart" icon="cart" />
              {me ? (
                <IconLink href="/me" ariaLabel="My Page" icon="user" />
              ) : (
                <IconLink href="/login" ariaLabel="Login" icon="user" />
              )}
            </nav>
            {/* Mobile right icons */}
          <div className="md:hidden flex items-center gap-3">
            <SearchButton />
            <IconLink href="/cart" ariaLabel="Cart" icon="cart" />
            {me ? (
              <IconLink href="/me" ariaLabel="My Page" icon="user" />
            ) : (
              <IconLink href="/login" ariaLabel="Login" icon="user" />
            )}
          </div>
          </div>
        )}
        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden border-t p-4 space-y-3">
            <Link href="/shop" onClick={() => setOpen(false)}>
              SHOP
            </Link>
            <Link href="/about" onClick={() => setOpen(false)}>
              ABOUT
            </Link>
            <Link href="/usage-guide" onClick={() => setOpen(false)}>
              HOW TO USE
            </Link>
            <Link href="/account" onClick={() => setOpen(false)}>
              ACCOUNT
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="h-[120px] border-t flex items-start">
        <div className="max-w-6xl mx-auto w-full px-4 flex flex-col justify-center gap-2">
          <div className="mt-3 w-full flex justify-start">
            <Link href="/" className="logo-font text-md">
              NANO RECIPE.
            </Link>
          </div>
          <div className="w-full flex flex-wrap justify-between text-sm">
            <div className="flex gap-4">
              <Link href="/company">회사 소개</Link>
              <Link href="/collections">Products</Link>
              <Link href="/about">Brand</Link>
              <Link href="/guide">Guide</Link>
            </div>
            <div className="text-gray-500">© {new Date().getFullYear()} NANO RECIPE.</div>
          </div>
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
      <button type="button" aria-label="Search" className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/20" onClick={() => setOpen((v) => !v)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-3.6-3.6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow p-2 w-64">
          <form action={`/shop?q=${encodeURIComponent(q)}`}>
            <Input label={null} value={q} onChange={(e) => setQ(e.target.value)} placeholder="placeholder." />
          </form>
        </div>
      )}
    </div>
  )
}

function IconLink({ href, ariaLabel, icon }) {
  return (
    <Link href={href} aria-label={ariaLabel} className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black/20">
      {icon === 'cart' ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2 2h3l3.6 12.59a2 2 0 0 0 2 1.41h7.92a2 2 0 0 0 2-1.58L23 7H6" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21a8 8 0 0 0-16 0" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )}
    </Link>
  )
}
