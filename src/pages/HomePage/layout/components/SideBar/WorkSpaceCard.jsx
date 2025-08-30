export default function WorkspaceCard({ title, color, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="h-20 relative">
        {image ? (
          <img
            src={image}
            alt="Workspace background"
            className="w-full h-full object-cover"
          />
        ) : color ? (
          <div className={`w-full h-full ${color}`} />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-orange-400 to-red-500" />
        )}
      </div>

      <div className="p-3">
        <h3 className="font-medium text-gray-800 text-sm">{title}</h3>
      </div>
    </div>
  )
}
