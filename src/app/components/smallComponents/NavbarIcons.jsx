'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { Button, Menu, MenuItem } from '@mui/material';
import { generateFromString } from 'generate-avatar';

import LogoutIcon from '@mui/icons-material/Logout';
import { UserContext } from '../../context/UserContext';
const NavbarIcons = () => {
  const { activeProfile } = useContext(UserContext);

  const userEmail = activeProfile?.email;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    localStorage.clear();

    handleClose();
    window.location.reload();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  return (
    <div className="flex justify-normal items-center gap-4">
      <Button
        id="basic-button"
        aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
      >
        <img
          src={`data:image/svg+xml;utf8,${generateFromString(
            userEmail ? userEmail : 'mail@gmail.com'
          )}`}
          className="w-10 h-10 rounded-full border-red-400 border"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       
        <MenuItem
          className="flex justify-between w-full gap-5 text-red-500"
          onClick={signOut}
        >
          Logout <LogoutIcon fontSize="25" />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavbarIcons;
