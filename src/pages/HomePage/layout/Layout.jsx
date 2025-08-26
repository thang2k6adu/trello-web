import React, { useState } from 'react'
import { Box } from '@mui/material'
import Header from './components/Header'
import Sidebar from './components/SideBar/Sidebar'
import MainContent from './components/MainContent'
import RecentlyViewed from './components/SideBar/RecenlyViewed'
import Workspaces from './components/SideBar/WorkSpaces'

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <RecentlyViewed />
          <Workspaces />
        </main>
      </div>
    </div>
  )
}