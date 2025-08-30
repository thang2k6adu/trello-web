import { X } from 'lucide-react'

export default function BoardModalHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-medium text-gray-700">Tạo bảng</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
        <X size={20} />
      </button>
    </div>
  )
}
