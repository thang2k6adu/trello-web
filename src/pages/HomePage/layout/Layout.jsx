import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
// import Header from './components/Header'
import AppBar from '~/components/AppBar/AppBar'
import Sidebar from './components/SideBar/Sidebar'
import RecentlyViewed from './components/SideBar/RecenlyViewed'
import Workspaces from './components/SideBar/WorkSpaces'
import { useDispatch, useSelector } from 'react-redux'
import { selectBoards } from '~/redux/board/boardSelectors'
import { fetchBoards } from '~/redux/board/boardSlice'
import { toast } from 'react-toastify'
import BoardCreationModal from '~/forms/CreateBoard'

export default function Layout() {
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleClick = () => {
    setIsModalOpen(true)
  }
  const { boards, loading, error } = useSelector(selectBoards)

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  if (loading) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-white">
      <AppBar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <RecentlyViewed boards={boards} />
          <Workspaces openModal={handleClick} boards={boards} />
          {isModalOpen && <BoardCreationModal onClose={() => setIsModalOpen(false)}/>}
        </main>
      </div>
    </div>
  )
}
