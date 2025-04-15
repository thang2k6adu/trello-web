import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

function Card({ card }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card },
  })
  const dndKitCardStyles = {
    // Trên di động, thao tác cuộn, thu phóng ưu tiên hơn là kéo thả
    // nếu không có touch-action thì kéo thả sẽ không được, thay vào đó là cuộn, thu phóng
    // touchAction: 'none',

    //transform là giá trị của useSortable trả về
    //chứa tọa độ di chuyển (x,y, scaleX, scaleY)
    //translate không áp dụng scale transform
    transform: CSS.Translate.toString(transform),
    // mặc định transition"transform 250ms ease"
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? '1px solid #2ecc71' : undefined

  }

  const showCardAction = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyles}
      {...attributes}
      {...listeners}

      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
      }}
    >
      {/* Card Media */}
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}

      {/* Card Content */}
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5,
          },
        }}
      >
        <Typography>{card?.title}</Typography>
      </CardContent>

      {/* Card Action */}
      {showCardAction() && (
        <CardActions sx={{ p: '0 4px 8px 4px' }}>
          {/* Card member */}
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}

          {/* Card comment */}
          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card?.comments?.length}
            </Button>
          )}

          {/* Card attachment */}
          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )}
    </MuiCard>
  )
}

export default Card
