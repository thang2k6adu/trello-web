import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLES = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
  '&:hover': {
    backgroundColor: 'primary.50',
  },
}

function BoardBar({ board }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        px: 2,
        overflowX: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#34495E' : '#1976d2',
      }}
    >
      {/* Board Bar left */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Board title */}
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            clickable
            icon={<DashboardIcon />}
            label={board?.title}
          />
          {/* Board type */}
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          clickable
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
        />
        <Chip
          sx={MENU_STYLES}
          clickable
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
        />
        <Chip
          sx={MENU_STYLES}
          clickable
          icon={<BoltIcon />}
          label="Automation"
        />
        <Chip
          sx={MENU_STYLES}
          clickable
          icon={<FilterListIcon />}
          label="Filters"
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
            },
          }}
          variant="outlined"
          startIcon={<PersonAddIcon />}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: '2px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 15,
              // border: 'none',
              color: 'white',
              cursor: 'pointer',
              '&:first-of-type': {
                backgroundColor: '#a4b0be',
              },
            },
          }}
        >
          <Tooltip title="thang2k6adu">
            <Avatar
              alt="thang2k6adu"
              src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRCQRSAPveKPpNXjoO0ahdt2I3ygMrY2VCBqVENplCiHrGxKrT6fHiJvM-pQMSHMLOW-s1VxYajjKMyb0I"
            />
          </Tooltip>
          <Tooltip title="Cát Tường">
            <Avatar
              alt="thang2k6adu"
              src="https://images2.thanhnien.vn/528068263637045248/2024/3/1/edit-img5891-17093048704171093747158.jpeg"
            />
          </Tooltip>
          <Tooltip title="Sơn Tùng">
            <Avatar
              alt="thang2k6adu"
              src="https://media-cdn-v2.laodong.vn/storage/newsportal/2024/12/19/1437715/Son-Tung.jpeg"
            />
          </Tooltip>
          <Tooltip title="Tiên Tiên">
            <Avatar
              alt="thang2k6adu"
              src="https://kenh14cdn.com/203336854389633024/2022/10/31/tien-tien-chia-se-hinh-anh-nam-tay-ban-gai-nhung-nhat-quyet-giau-kin-mat1-13014869-16672149891191035556599.jpg"
            />
          </Tooltip>
          <Tooltip title="Thắng đẹp chai">
            <Avatar
              alt="thang2k6adu"
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/avatar-anh-meo-cute-5.jpg"
            />
          </Tooltip>
          <Tooltip title="Ciao">
            <Avatar
              alt="thang2k6adu"
              src="https://upload-os-bbs.hoyolab.com/upload/2025/02/12/423331180/4237e536ce8b31d839e79af0b93957dc_1506769670917224663.webp?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_70"
            />
          </Tooltip>
          <Tooltip title="thang2k6adu">
            <Avatar
              alt="thang2k6adu"
              src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRCQRSAPveKPpNXjoO0ahdt2I3ygMrY2VCBqVENplCiHrGxKrT6fHiJvM-pQMSHMLOW-s1VxYajjKMyb0I"
            />
          </Tooltip>
          <Tooltip title="thang2k6adu">
            <Avatar
              alt="thang2k6adu"
              src="https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRCQRSAPveKPpNXjoO0ahdt2I3ygMrY2VCBqVENplCiHrGxKrT6fHiJvM-pQMSHMLOW-s1VxYajjKMyb0I"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
