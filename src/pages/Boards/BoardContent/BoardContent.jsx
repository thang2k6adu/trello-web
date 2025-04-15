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
import { cloneDeep } from 'lodash'

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

  // Board thay đổi thì mới dùng tới (vẫn chạy trong lần mount đầu tiên), đoạn này dùng khi gọi API
  useEffect(() => {
    const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
    setOrderedColumns(orderedColumns)
  }, [board])

  // Tìm column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find((column) => column.cards.map((card) => card._id)?.includes(cardId))
  }

  // Khi bắt đầu kéo phần tử
  const handleDragStart = (e) => {
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(
      e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(e?.active?.data?.current)
  }

  // Được gọi trong quá trình kéo 1 phần tử
  const handleDragOver = (e) => {
    // Không làm gì thêm nếu như kéo thả Column

    // console.log('handleDragOver:', e)

    // activeDragItemType là cái mà chúng ta đang kéo
    // activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN là kéo thả Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = e

    // Nếu không tồn tại active hoặc over (khi kéo ra khỏi phạm vi của container) thì sẽ không làm gì cả, tránh crash trang
    if (!active || !over) return

    // activeDraggingCardId là cái mà chúng ta đang kéo
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active
    // overCardId là cái mà active đang tương tác với (hiểu đơn giản là sắp thả vào đó)
    const { id: overCardId } = over

    // Tìm 2 column mà cái active và over thuộc về
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không tồn tại một trong 2 column thì không làm gì hết, tránh crash web
    if (!activeColumn || !overColumn) return

    // Xử lí logic ở đây chỉ khi kéo card qua 2 column khác nhau, giống column sẽ không làm gì
    if (activeColumn._id !== overColumn._id) {
      setOrderedColumns((preColumns) => {
        // Tìm vị trí (index) của overCard trong column đích (nơi card đang kéo sắp thả)
        const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

        // Logic tính toán cardIndex mới (trên hoặc dưới của overCard)
        let newCardIndex
        const isBelowOverItem =
          active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0
        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        // Bản chất là ta đang clone mảng OrderedColumnsState cũ ra một cái mới để xử lí data rồi return
        // Cập nhật lại OrderedColumnsState mới
        const nextColumns = cloneDeep(preColumns)
        const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

        if (nextActiveColumn) {
          // Xóa card trong column cũ
          nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)

          // cập nhật lại cardOrderIds
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
        }
        if (nextOverColumn) {
          // Kiểm tra xem card đã tồn tại trong column đích chưa, nếu chưa thì xóa trước
          nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)
          // Thêm card vào column mới, vào vị trí mới
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData) // toSplice trả về mảng mới, splice thay đổi mảng gốc

          // cập nhật lại cardOrderIds
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
        }
        return nextColumns
      })
    }
  }

  // Kết thúc việc kéo phần tử
  const handleDragEnd = (e) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      console.log('keo tha card')
      return
    }
    console.log('handleDragEnd:', e)

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
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd} sensors={sensors}>
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
