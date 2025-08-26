import { Search, Plus, Bell, Grid3X3, User, Settings, ChevronUp, Clock, Users, Cog, Crown } from 'lucide-react'
import WorkspaceCard from './WorkSpaceCard'

export default function RecentlyViewed() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Đã xem gần đây</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <WorkspaceCard title="idurar-erp-crm" image="/desert-landscape-with-white-buildings.png" />
        <WorkspaceCard title="trello" image="/desert-landscape-with-white-buildings.png" />
      </div>
    </div>
  )
}