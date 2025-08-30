import { backgroundImages, gradientColors } from '~/utils/background'

export default function BoardPreview({ selectedBackground }) {
  return (
    <div className="relative">
      <div
        className={`h-32 rounded-lg flex items-center justify-center ${
          selectedBackground < backgroundImages.length
            ? 'bg-cover bg-center'
            : gradientColors[selectedBackground - backgroundImages.length]
        }`}
        style={
          selectedBackground < backgroundImages.length
            ? { backgroundImage: `url(${backgroundImages[selectedBackground]})` }
            : {}
        }
      >
        {/* Kanban Board Preview */}
        <div className="flex gap-2 opacity-80">
          {[1, 2, 3].map((col) => (
            <div key={col} className="bg-white bg-opacity-90 rounded p-2 w-16">
              <div className="space-y-1">
                <div className="h-1 bg-gray-300 rounded"></div>
                <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                <div className="h-1 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Upload Icon */}
        <div className="absolute top-2 right-2 bg-white bg-opacity-20 rounded p-1">
          <div className="w-4 h-4 border border-white border-opacity-60 rounded flex items-center justify-center">
            <span className="text-white text-xs">📁</span>
          </div>
        </div>
      </div>
    </div>
  )
}
