import { Search, Plus, Bell, Grid3X3, User, Settings, ChevronUp, Clock, Users, Cog, Crown } from 'lucide-react'
import IconButton from './SideBar/IconButton'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-gray-800">Trello</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="pl-10 pr-4 py-2 w-96 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Tạo mới
          </button>
          <IconButton Icon={Grid3X3} />
          <IconButton Icon={Bell} />
          <IconButton Icon={User} />
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">TO</span>
          </div>
        </div>
      </div>
    </header>
  )
}
