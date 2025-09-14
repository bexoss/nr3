import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import PublicLayout from '../../components/PublicLayout'
import { apiGet } from '../../lib/api'

export default function ProductDetail() {
  const router = useRouter()
  const { pid } = router.query
  const { data } = useQuery({
    queryKey: ['product', pid],
    queryFn: () => apiGet(`/products/${pid}`),
    enabled: !!pid
  })
  const p = data || {}
  return (
    <PublicLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold">{p.title || p.name}</h1>
        <div className="mt-2 text-gray-600">{p.option}</div>
        <div className="my-4 whitespace-pre-wrap">{p.content}</div>
        <div className="text-xl font-semibold">₩ {p.price?.toLocaleString?.() || p.price}</div>
      </div>
    </PublicLayout>
  )
}
