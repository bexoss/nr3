import PublicLayout from '../components/PublicLayout'

export default function Signup() {
  return (
    <PublicLayout>
      <div className="max-w-sm mx-auto px-4 py-10 space-y-4">
        <h1 className="text-2xl font-semibold mb-2">회원가입</h1>
        <input placeholder="Name" className="w-full border px-3 py-2" />
        <input placeholder="Email" className="w-full border px-3 py-2" />
        <input placeholder="Password" type="password" className="w-full border px-3 py-2" />
        <button className="w-full bg-black text-white py-2 rounded">가입하기</button>
        <div className="text-center text-sm text-gray-600">또는</div>
        <div className="grid grid-cols-3 gap-2">
          <button className="border py-2 rounded">Google</button>
          <button className="border py-2 rounded">Line</button>
          <button className="border py-2 rounded">Facebook</button>
        </div>
      </div>
    </PublicLayout>
  )
}
