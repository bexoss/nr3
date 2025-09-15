export default function Table({ columns = [], rows = [], className = '' }) {
  return (
    <div className={["overflow-x-auto border rounded-md", className].join(' ')}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((c) => (
              <th key={c.key || c.accessor} className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={i}>
              {columns.map((c) => (
                <td key={c.key || c.accessor} className="px-4 py-2 text-sm text-gray-900">
                  {c.render ? c.render(r) : r[c.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

