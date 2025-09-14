import { useQuery } from '@tanstack/react-query'
import PublicLayout from '../../components/PublicLayout'
import { apiGet } from '../../lib/api'

export default function Shop() {
  const { data } = useQuery({ queryKey: ['products'], queryFn: () => apiGet('/products?sort=best') })
  const items = data?.items || []
  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">SHOP</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((p) => (
            <a key={p._id} href={`/p/${p._id}`} className="border p-3 rounded hover:shadow">
              <div className="font-medium">{p.title || p.name}</div>
              <div className="text-sm text-gray-600">{p.option}</div>
              <div className="mt-2">₩ {p.price?.toLocaleString?.() || p.price}</div>
            </a>
          ))}
        </div>
      </div>
    </PublicLayout>
  )
}
