import { Trello, Layout, Activity } from 'lucide-react';

import SidebarLink from './SidebarLink'
import WorkspaceSidebar from './WorkSpaceSidebar'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          <SidebarLink Icon={Trello} label="Bảng" active />
          <SidebarLink label="Mẫu" Icon={Layout}/>
          <SidebarLink label="Trang chủ" Icon={Activity}/>
        </ul>

        <div className="mt-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Các Không gian làm việc</h3>

          <WorkspaceSidebar />
        </div>
      </nav>
    </aside>
  )
}
