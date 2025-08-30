export default function BoardTitleInput({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tiêu đề bảng <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{ color: '#000' }}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && (
        <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
          <span>👋</span> Tiêu đề bảng là bắt buộc
        </p>
      )}
    </div>
  )
}