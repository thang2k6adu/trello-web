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
            gap: '10px',
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
