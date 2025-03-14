import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)

  // activationConstrain: hạn chế kích hoạt, distance 10px mới kích hoạt kéo, fix click bị gọi event, tránh kéo thả không mong muốn
  // distance và tolerance, máy tính và điện thoại, dùng pointerSensor phải dùng thuộc tính touch-action + còn bugs
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //nếu giữa và di chuyển dưới 5px thì kéo (bị ảnh hưởng bởi delay), tránh nhầm lẫn với cuộn, zoom.
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })

  const sensors = useSensors(mouseSensor, touchSensor)

  // Board thay đổi thì mới dùng tới, đoạn này dùng khi gọi API
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])

  // Khi bắt đầu kéo phần tử
  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(e?.active?.data?.current)
  }

  // Kết thúc việc kéo phần tử
  const handleDragEnd = (e) => {
    const { active, over } = e
    //Kiểm tra nếu không tồn tại over (kéo linh tinh ra ngoài thì return luôn, tránh lôi)
    if (!over) return

    // Nếu vị trí kéo khác vị trí ban đầu
    if (active.id != over.id) {
      //lấy vị trí cũ của active, là vị trí 1, 2, 3, ... trong mảng
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
      //lấy vị trí cũ của active
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      // arrayMove để thay đổi columns khi kéo thả (mảng object)
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      // Xử lí thay đổi lên API, F5 không bị refresh (mảng giá trị)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      //cập nhật lại state sau khi kéo thả
      setOrderedColumns(dndOrderedColumns)
    }

    // Chỉ khi kéo mới dữ liệu, end rồi thì set null
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }

  //Animation khi thả phần tử (Drop) - chỗ overlay không bị giật, biến mất nhanh chóng
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } }),
  }
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976d2'),
          height: (theme) => theme.trelloCustom.boardContentHeight,
          width: '100%',
          padding: '10px 0',
        }}
      >
        <ListColumns columns={orderedColumns} />

        <DragOverlay dropAnimation={customDropAnimation}>
          {/* Trường hợp không kéo thả */}
          {!activeDragItemId && null}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
