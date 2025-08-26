import { Search, Plus, Bell, Grid3X3, User, Settings, ChevronUp, Clock, Users, Cog, Crown } from 'lucide-react'
import SidebarLink from './SidebarLink'
import WorkspaceSidebar from './WorkSpaceSidebar'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          <SidebarLink Icon={Grid3X3} label="Bảng" active />
          <SidebarLink label="Mẫu" />
          <SidebarLink label="Trang chủ" />
        </ul>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Các Không gian làm việc</h3>

          <WorkspaceSidebar />
        </div>
      </nav>
    </aside>
  )
}
