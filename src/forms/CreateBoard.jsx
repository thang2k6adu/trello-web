'use client'

import React, { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'

// data
const backgroundImages = [
  'https://cdn-media.sforum.vn/storage/app/media/anh-dep-16.jpg',
  'https://cdn-media.sforum.vn/storage/app/media/anh-dep-15.jpg',
  'https://cdn-media.sforum.vn/storage/app/media/anh-dep-14.jpg',
  'https://cdn-media.sforum.vn/storage/app/media/anh-dep-11.jpg',
]

const gradientColors = [
  'bg-gradient-to-br from-blue-200 to-blue-100',
  'bg-gradient-to-br from-blue-500 to-cyan-400',
  'bg-gradient-to-br from-blue-600 to-blue-800',
  'bg-gradient-to-br from-purple-500 to-indigo-600',
  'bg-gradient-to-br from-purple-400 to-pink-400',
]

// ---------------- Sub Components ----------------

// 1. Header
function BoardModalHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-lg font-medium text-gray-700">Tạo bảng</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
        <X size={20} />
      </button>
    </div>
  )
}

// 2. Preview Area
function BoardPreview({ selectedBackground }) {
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

// 3. Background Selector
function BackgroundSelector({ selected, onSelect }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-2">Phông nền</h3>
      <div className="grid grid-cols-4 gap-2 mb-2">
        {backgroundImages.map((img, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`h-12 rounded bg-cover bg-center border-2 transition-all ${
              selected === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="flex gap-2">
        {gradientColors.map((gradient, index) => (
          <button
            key={index}
            onClick={() => onSelect(backgroundImages.length + index)}
            className={`w-8 h-8 rounded border-2 transition-all ${gradient} ${
              selected === backgroundImages.length + index
                ? 'border-blue-500 ring-2 ring-blue-200'
                : 'border-gray-200 hover:border-gray-300'
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

// 4. Board Title Input
function BoardTitleInput({ value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Tiêu đề bảng <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
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

// 5. View Permission Selector
function ViewPermissionSelector({ value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Quyền xem</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="text-gray-700">{value}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {['Không gian làm việc', 'Riêng tư'].map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className="w-full px-3 py-2 text-left hover:bg-gray-50 text-gray-700"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// 6. Action Buttons
function BoardActions({ onCreate, onClose }) {
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

// 7. Footer
function BoardFooter() {
  return (
    <div className="text-xs text-gray-500 text-center pt-2 border-t">
      Bằng cách sử dụng hình ảnh từ Unsplash, bạn đồng ý với{' '}
      <a href="#" className="text-blue-600 hover:underline">
        giấy phép
      </a>{' '}
      và{' '}
      <a href="#" className="text-blue-600 hover:underline">
        Điều khoản dịch vụ
      </a>
    </div>
  )
}

// ---------------- Main Component ----------------

export default function BoardCreationModal({ onClose }) {
  const [selectedBackground, setSelectedBackground] = useState(0)
  const [boardTitle, setBoardTitle] = useState('')
  const [showTitleError, setShowTitleError] = useState(false)
  const [viewPermission, setViewPermission] = useState('Không gian làm việc')

  const handleCreateBoard = () => {
    if (!boardTitle.trim()) {
      setShowTitleError(true)
      return
    }
    console.log('Creating board:', { title: boardTitle, background: selectedBackground })
    onClose()
  }

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value)
    if (showTitleError && e.target.value.trim()) {
      setShowTitleError(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <BoardModalHeader onClose={onClose} />
        <div className="p-4 space-y-4">
          <BoardPreview selectedBackground={selectedBackground} />
          <BackgroundSelector selected={selectedBackground} onSelect={setSelectedBackground} />
          <BoardTitleInput value={boardTitle} onChange={handleTitleChange} error={showTitleError} />
          <ViewPermissionSelector value={viewPermission} onChange={setViewPermission} />
          <BoardActions onCreate={handleCreateBoard} onClose={onClose} />
          <BoardFooter />
        </div>
      </div>
    </div>
  )
}
