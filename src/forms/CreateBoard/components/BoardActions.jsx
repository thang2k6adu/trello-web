export default function BoardActions({ onCreate, onClose }) {
  return (
    <div className="space-y-2 pt-2">
      <button
        onClick={onCreate}
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Tạo mới
      </button>
      <button
        onClick={onClose}
        className="w-full py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
      >
        Bắt đầu với Mẫu
      </button>
    </div>
  )
}