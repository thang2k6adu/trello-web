import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

function getLabelByValue(value, options) {
  const option = options.find((opt) => opt.value === value)
  return option ? option.label : null
}

const options = [
  { label: 'Công khai', value: 'public' },
  { label: 'Riêng tư', value: 'private' },
]

export default function ViewPermissionSelector({ value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Quyền xem</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-gray-700">{getLabelByValue(value, options)}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-700"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
