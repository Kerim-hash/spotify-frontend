import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { useRouter } from 'next/router';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useDispatch } from 'react-redux';
import { setProfile } from '../store/actions-creators/users';
// import SetProfileAction from '../'
export default function ProfileSelect({profile}) {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    dispatch(setProfile(undefined))
  }
  const router  = useRouter()
  return (
    <div>
      <Button
        id="fade-button"
        sx={{padding: '5px 1px'}}
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        variant="contained"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img width={30} height={30} style={{borderRadius: '50%', marginRight: '7px', objectFit: 'cover'}} src={'http://localhost:5000/' + profile?.avatar} />
        {profile.fullname}
         <ArrowDropDownIcon sx={{transform: open && 'rotate(180deg)'}} />
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={() => router.push('/profile')}>Profile</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
function SetProfileAction(undefined: undefined): any {
  throw new Error('Function not implemented.');
}

