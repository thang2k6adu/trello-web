import { Search, Plus, Bell, Grid3X3, User, Settings, ChevronUp, Clock, Users, Cog, Crown } from 'lucide-react'
import WorkspaceCard from './WorkSpaceCard'
import WorkspaceAction from './WorkSpaceAction'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export default function Workspaces({ openModal, boards }) {
  const navigate = useNavigate()

  const handleClick = useCallback(
    (id) => {
      navigate(`/boards/${id}`)
    },
    [navigate]
  )
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-6">CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold">T</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Trello Không gian làm việc</h3>
          </div>

          <div className="flex items-center gap-2">
            <WorkspaceAction Icon={Grid3X3} label="Bảng" />
            <WorkspaceAction Icon={Users} label="Thành viên" />
            <WorkspaceAction Icon={Cog} label="Cài đặt" />
            <WorkspaceAction Icon={Crown} label="Nâng cấp" gradient whiteText />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="grid grid-cols-4 gap-4 flex-1 items-stretch">
            {boards.map((board) => (
              <WorkspaceCard
                onClick={() => handleClick(board._id)}
                key={board.title}
                title={board.title}
                image={board.image}
              />
            ))}
            <div onClick={openModal} className="h-full">
              <div
                className="h-full bg-gray-50 rounded-lg p-4 hover:bg-gray-100 
                transition-colors cursor-pointer
                flex flex-col items-center justify-center text-center"
              >
                <Plus className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Tạo bảng mới</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button className="text-sm text-blue-600 hover:text-blue-700">Xem tất cả các bảng đã đóng</button>
        </div>
      </div>
    </div>
  )
}
