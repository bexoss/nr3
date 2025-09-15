import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PublicLayout from '../../components/PublicLayout'
import { Button, Input, TextArea, Dialog, Table, Title1, Body2 } from '../../components/ui'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api'

export default function AdminNotices() {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ title: '', body: '', showOnTop: false, active: true })

  // Fetch list via TanStack Query
  const { data, isLoading } = useQuery({
    queryKey: ['notices', { limit: 20 }],
    queryFn: async () => {
      const r = await fetch(`${API_BASE}/notices?limit=20`)
      if (!r.ok) throw new Error('failed_fetch')
      return r.json()
    },
  })
  const list = data || []

  function edit(n) {
    setEditing(n)
    setForm({ title: n?.title || '', body: n?.body || '', showOnTop: !!n?.showOnTop, active: !!n?.active })
    setOpen(true)
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      const method = editing?._id ? 'PUT' : 'POST'
      const url = editing?._id ? `${API_BASE}/notices/${editing._id}` : `${API_BASE}/notices`
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!r.ok) throw new Error('failed_save')
      return r.json()
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notices'] })
      setOpen(false)
      setEditing(null)
    },
  })

  function save() {
    saveMutation.mutate()
  }

  const deleteMutation = useMutation({
    mutationFn: async (n) => {
      const r = await fetch(`${API_BASE}/notices/${n._id}`, { method: 'DELETE' })
      if (!r.ok) throw new Error('failed_delete')
      return true
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notices'] }),
  })
  function remove(n) {
    // TODO: replace with custom confirm dialog per project rule
    if (typeof window !== 'undefined' && !window.confirm('삭제하시겠습니까?')) return
    deleteMutation.mutate(n)
  }

  const columns = [
    { header: '제목', accessor: 'title' },
    { header: '상단표시', accessor: 'showOnTop', render: (r) => (r.showOnTop ? 'ON' : 'OFF') },
    { header: '활성', accessor: 'active', render: (r) => (r.active ? 'Y' : 'N') },
    { header: '수정', accessor: 'actions', render: (r) => (
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => edit(r)}>수정</Button>
        <Button size="sm" variant="destructive" onClick={() => remove(r)}>삭제</Button>
      </div>
    ) },
  ]

  return (
    <PublicLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <Title1>공지사항</Title1>
          <Button onClick={() => edit(null)}>새 공지</Button>
        </div>
        {isLoading ? (
          <Body2 className="text-gray-500">불러오는 중…</Body2>
        ) : (
          <Table columns={columns} rows={list} />
        )}

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          title={editing?._id ? '공지 수정' : '새 공지'}
          footer={<>
            <Button variant="ghost" onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={save}>저장</Button>
          </>}
        >
          <div className="space-y-3">
            <Input label="제목" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.showOnTop} onChange={(e) => setForm({ ...form, showOnTop: e.target.checked })} />
                상단 표시
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
                활성화
              </label>
            </div>
            <TextArea label="본문(HTML)" rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            <Body2 className="text-gray-500">이미지/동영상은 URL을 본문에 삽입하세요. 업로드 스토리지는 추후 연동합니다.</Body2>
            {saveMutation.isError && (
              <Body2 className="text-red-600">저장 중 오류가 발생했습니다.</Body2>
            )}
          </div>
        </Dialog>
      </div>
    </PublicLayout>
  )
}
