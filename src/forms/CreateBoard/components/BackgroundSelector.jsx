import { backgroundImages, gradientColors } from '~/utils/background'

export default function BackgroundSelector({ selected, onSelect, handleSelectImage, handleSelectColor }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Phông nền</h3>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {backgroundImages.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              handleSelectImage(img)
              onSelect(index)
            }}
            className={`h-12 rounded bg-cover bg-center border-2 transition-all ${
              selected === img ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="flex gap-2">
        {gradientColors.map((gradient, index) => (
          <button
            key={index}
            onClick={() => {
              handleSelectColor(gradient)
              onSelect(backgroundImages.length + index)
            }}
            className={`w-8 h-8 rounded border-2 transition-all ${gradient} ${
              selected === gradient ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
            }`}
          />
        ))}
        <button className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-300 flex items-center justify-center text-gray-400">
          •••
        </button>
      </div>
    </div>
  )
}
