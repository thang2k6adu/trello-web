import { Search, Plus, Bell, Grid3X3, User, Settings, ChevronUp, Clock, Users, Cog, Crown } from 'lucide-react'
import SidebarLink from './SidebarLink'

export default function WorkspaceSidebar() {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-md">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">T</span>
          </div>
          <span className="text-sm font-medium text-gray-800">Trello Không gian làm việc</span>
        </div>
        <ChevronUp className="w-4 h-4 text-gray-500" />
      </div>

      <div className="ml-8 space-y-1">
        <SidebarLink Icon={Grid3X3} label="Bảng" />
        <SidebarLink Icon={Users} label="Thành viên" actionIcon={Plus} />
        <SidebarLink Icon={Settings} label="Cài đặt" />
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Nâng cấp Không gian làm việc này</h4>
        <p className="text-sm text-gray-600 mb-3">Nhận các bảng không giới hạn, tự động hóa nâng cao và hơn thế nữa.</p>
        <button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:from-purple-600 hover:to-blue-700 transition-all">
          Nâng cấp
        </button>
      </div>
    </div>
  )
}