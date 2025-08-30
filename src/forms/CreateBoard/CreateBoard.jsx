'use client'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBoard } from '~/redux/board/boardSlice'
import BackgroundSelector from './components/BackgroundSelector'
import BoardModalHeader from './components/BoardModalHeader'
import BoardPreview from './components/BoardPreview'
import BoardTitleInput from './components/BoardTitleInput'
import ViewPermissionSelector from './components/ViewPermissionSelector'
import BoardFooter from './components/BoardFooter'
import BoardActions from './components/BoardActions'
import { backgroundImages, gradientColors } from '~/utils/background'

export default function BoardCreationModal({ onClose }) {
  const [selectedBackground, setSelectedBackground] = useState(0)
  const [boardTitle, setBoardTitle] = useState('')
  const [showTitleError, setShowTitleError] = useState(false)
  const [viewPermission, setViewPermission] = useState('public')
  const [image, setImage] = useState('')
  const [color, setColor] = useState('')
  const dispatch = useDispatch()

  const handleCreateBoard = () => {
    if (!boardTitle.trim()) {
      setShowTitleError(true)
      return
    }

    dispatch(
      addBoard({
        title: boardTitle,
        color,
        image,
        type: viewPermission,
      })
    )

    console.log({
      title: boardTitle,
      color,
      image,
      type: viewPermission,
    })

    onClose()
  }

  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value)
    if (showTitleError && e.target.value.trim()) {
      setShowTitleError(false)
    }
  }

  const handleSelectImage = (image) => {
    setImage(image)
    setColor('')
  }
  const handleSelectColor = (color) => {
    setColor(color)
    setImage('')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <BoardModalHeader onClose={onClose} />
        <div className="p-4 space-y-4">
          <BoardPreview selectedBackground={selectedBackground} />
          <BackgroundSelector
            selected={selectedBackground}
            onSelect={setSelectedBackground}
            handleSelectImage={handleSelectImage}
            handleSelectColor={handleSelectColor}
          />
          <BoardTitleInput value={boardTitle} onChange={handleTitleChange} error={showTitleError} />
          <ViewPermissionSelector value={viewPermission} onChange={setViewPermission} />
          <BoardActions onCreate={handleCreateBoard} onClose={onClose} />
          <BoardFooter />
        </div>
      </div>
    </div>
  )
}
