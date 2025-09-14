import AdminLayout from '../../components/AdminLayout'

export default function AdminHome() {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="text-gray-600">좌측 사이드바에서 관리 메뉴를 선택하세요.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <a href="/admin/products" className="border rounded p-3 hover:shadow">Products</a>
          <a href="/admin/users" className="border rounded p-3 hover:shadow">Users</a>
          <a href="/admin/orders" className="border rounded p-3 hover:shadow">Orders</a>
          <a href="/admin/campaigns" className="border rounded p-3 hover:shadow">Campaigns</a>
        </div>
      </div>
    </AdminLayout>
  )
}

