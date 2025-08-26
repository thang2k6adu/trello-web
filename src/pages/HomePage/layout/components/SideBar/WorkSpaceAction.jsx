export default function WorkspaceAction({ Icon, label, gradient, whiteText }) {
  const baseClass = `flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
    whiteText ? 'text-white' : 'text-gray-700'
  } ${
    gradient
      ? 'bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700'
      : 'hover:bg-gray-100'
  }`
  return (
    <button className={baseClass}>
      <Icon className="w-4 h-4" />
      {label}
    </button>
  )
}