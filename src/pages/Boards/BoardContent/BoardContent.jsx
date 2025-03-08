import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sort'

import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'

function BoardContent({ board }) {
  const [orderedColumns, setOrderedColumns] = useState([])

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
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495E' : '#1976d2'),
          height: (theme) => theme.trelloCustom.boardContentHeight,
          width: '100%',
          padding: '10px 0',
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
