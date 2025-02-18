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

const MENU_STYLES = {
  color: 'primary.main',
  backgroundColor: 'white',
  borde: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '& .MuiSvgIcon-root': {
    color: 'primary.main',
  },
  '&:hover': {
    backgroundColor: 'primary.50',
  },
}

function BoardBar() {
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
        borderTop: '1px solid #00bfa5',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip
          sx={MENU_STYLES}
          clickable
          icon={<DashboardIcon />}
          label="ThangDepChai's Board"
        />
        <Chip
          sx={MENU_STYLES}
          clickable
          icon={<VpnLockIcon />}
          label="Public/Private Workspace"
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
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{ '& .MuiAvatar-root': { width: 34, height: 34, fontSize: 16 } }}
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
