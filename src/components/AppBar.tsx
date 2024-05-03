import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function AppBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ flexGrow: 1, display: 'flex' }}>
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1, display: 'flex', alignItems: 'center', width: '100%', columnGap: '.75em',
            }}
          >
            CaddyMasters
            {' '}
            <SportsGolfIcon />
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Typography sx={{ padding: '1em' }}>Player Name</Typography>
            </Menu>
          </div>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
