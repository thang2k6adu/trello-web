import { Search, Plus, Bell, Grid3X3, User, Settings, ChevronUp, Clock, Users, Cog, Crown } from 'lucide-react'

export default function SidebarLink({ Icon, label, active, actionIcon: ActionIcon }) {
  const baseClass = 'flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100'
  return (
    <a href="#" className={`${baseClass} ${active ? 'text-blue-600 bg-blue-50' : ''}`}>
      {Icon && typeof Icon === 'function' ? (
        <Icon className="w-4 h-4" />
      ) : (
        <div className="w-4 h-4 bg-gray-400 rounded" />
      )}
      {label}
      {ActionIcon && <ActionIcon className="w-4 h-4 ml-auto" />}
    </a>
  )
}
