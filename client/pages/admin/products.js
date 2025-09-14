import { useEffect, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AdminLayout from '../../components/AdminLayout'
import { apiGet } from '../../lib/api'

export default function AdminProducts() {
  const [q, setQ] = useState('')
  const [page, setPage] = useState(1)
  const size = 20
  const key = useMemo(() => ['admin-products', { q, page, size }], [q, page])
  const { data, isLoading } = useQuery({
    queryKey: key,
    queryFn: () => apiGet(`/products?q=${encodeURIComponent(q)}&page=${page}&size=${size}`)
  })

  const items = data?.items || []
  const total = data?.total || 0
  const pages = Math.max(1, Math.ceil(total / size))

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Products</h1>
        <div className="flex gap-2">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setPage(1)
            }}
            placeholder="검색: 이름/타이틀/옵션/SKU"
            className="border px-3 py-2 text-sm w-64"
          />
        </div>
      </div>

      <div className="overflow-auto border rounded">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 w-10"><input type="checkbox" /></th>
              <th className="p-2 text-left">SKU</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Option</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-center">Active</th>
              <th className="p-2 text-right">Ranking</th>
              <th className="p-2">상세</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">불러오는 중...</td>
              </tr>
            )}
            {!isLoading && items.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-center text-gray-500">데이터가 없습니다.</td>
              </tr>
            )}
            {items.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2 text-center"><input type="checkbox" /></td>
                <td className="p-2 font-mono">{p.sku}</td>
                <td className="p-2">{p.title || p.name}</td>
                <td className="p-2">{p.option}</td>
                <td className="p-2 text-right">{(p.price ?? 0).toLocaleString()}</td>
                <td className="p-2 text-center">{p.active ? 'Y' : 'N'}</td>
                <td className="p-2 text-right">{p.rankingScore}</td>
                <td className="p-2 text-center">
                  <a href={`/p/${p._id}`} className="inline-block px-2 py-1 border rounded" title="상세보기">
                    📄
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-3 text-sm">
        <div>총 {total}건</div>
        <div className="flex items-center gap-2">
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
          >
            이전
          </button>
          <span>
            {page} / {pages}
          </span>
          <button
            className="px-2 py-1 border rounded disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page >= pages}
          >
            다음
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
