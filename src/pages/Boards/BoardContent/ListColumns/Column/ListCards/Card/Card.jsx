import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'

function Card({ temporaryHideMedia }) {
  if (temporaryHideMedia) {
    return (
      <MuiCard
        sx={{
          cursor: 'pointer',
          boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
          overflow: 'unset',
        }}
      >

        {/* Card Content */}
        <CardContent
          sx={{
            p: 1.5,
            '&:last-child': {
              p: 1.5,
            },
          }}
        >
          <Typography>Card test 01</Typography>
        </CardContent>
      </MuiCard>
    )
  }
  return (
    <MuiCard
      sx={{
        cursor: 'pointer',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
        overflow: 'unset',
      }}
    >
      {/* Card Media */}
      <CardMedia
        sx={{ height: 140 }}
        image="https://cellphones.com.vn/sforum/wp-content/uploads/2022/05/Genshin-Impact_-23.jpg"
        title="Genshin Impact"
      />
      {/* Card Content */}
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child': {
            p: 1.5,
          },
        }}
      >
        <Typography>Genshin Impact</Typography>
      </CardContent>
      {/* Card Action */}
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          15
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          100
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
