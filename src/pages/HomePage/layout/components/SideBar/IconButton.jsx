export default function IconButton({ Icon }) {
  return (
    <button className="p-2 hover:bg-gray-100 rounded">
      <Icon className="w-5 h-5 text-gray-600" />
    </button>
  )
}