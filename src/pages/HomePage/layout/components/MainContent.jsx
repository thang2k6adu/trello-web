import { Search, Plus, Bell, Grid3X3, User, Settings, ChevronUp, Clock, Users, Cog, Crown } from 'lucide-react'
import Header from './Header'
import Sidebar from './SideBar/Sidebar'
import RecentlyViewed from './SideBar/RecenlyViewed'
import Workspaces from './SideBar/WorkSpaces'

export default function TrelloClone() {
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
