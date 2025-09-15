import { useRouter } from 'next/router'
import PublicLayout from '../../components/PublicLayout'
import { Title1, Body2 } from '../../components/ui'
import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../../lib/api'

export default function NoticeDetail() {
  const { query } = useRouter()
  const id = query.id
  const { data: notice } = useQuery({
    queryKey: ['notice', id],
    queryFn: () => apiGet(`/notices/${id}`),
    enabled: !!id,
  })

  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        {!notice ? (
          <div className="text-sm text-gray-500">로딩 중…</div>
        ) : (
          <article className="prose max-w-none">
            <Title1 className="mb-2">{notice.title}</Title1>
            <Body2 className="text-gray-500 mb-6">{new Date(notice.createdAt).toLocaleString()}</Body2>
            <div dangerouslySetInnerHTML={{ __html: notice.body || '' }} />
          </article>
        )}
      </div>
    </PublicLayout>
  )
}

// Force SSR to avoid SSG expectations for dynamic route
export async function getServerSideProps() {
  return { props: {} }
}
