'use client';
import React, { useEffect, useState, useContext } from 'react';
import Wallet from './smallComponents/Wallet';
import NavbarIcons from './smallComponents/NavbarIcons';
import Link from 'next/link';
import { UserContext } from '../context/UserContext';
import { Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from '../api/auth';
import { usePathname } from 'next/navigation';
import { generateFromString } from 'generate-avatar';

const Navbar = ({ open, setOpen }) => {
  const [role, setRole] = useState('');
  const location = usePathname();

  const [anchorEl, setAnchorEl] = useState(null);
  const { activeProfile, setUser } = useContext(UserContext);

  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = async () => {
    try {
      await logoutUser();
      setUser(null);

    } catch (error) {
      console.error('Error during logout:', error);
    }
    handleClose();
  };

  useEffect(() => {
    if (activeProfile) {
      setRole(activeProfile.role);
    }
  }, [activeProfile]);

  const userEmail = activeProfile?.email;

  return (
    <div className="w-full sm:p-4 flex  gap-20 justify-normal items-center h-[100px]">
      <div className="w-full flex flex-1 items-center justify-between">
        <div className="flex justify-start gap-0">
          <div className="xl:hidden flex justify-center items-center">
            <Button onClick={() => setOpen((prev) => !prev)} className="flex justify-center items-center p-0 ">
              <MenuIcon color="#2B77BB" />
            </Button>
          </div>
          <h1 className="text-[#2B77BB] lg:text-4xl sm:text-2xl pl-3 text-base font-semibold sm:block hidden ">
            Admin Dashboard
          </h1>
        </div>
        <div className="sm:flex flex-col-reverse md:flex-row justify-around items-center  gap-4 md:gap-10 hidden">
          {/* <Wallet /> */}
          <NavbarIcons />
        </div>
        <div className="sm:hidden flex gap-2 justify-center items-center">
          {/* <Wallet /> */}
          <img src="assets/icons/notification.svg" className="ml-2 w-4 h-4" />
          <Button
            id="basic-button"
            aria-controls={openMenu ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? 'true' : undefined}
            onClick={handleClick}
          >
            <img
              src={`data:image/svg+xml;utf8,${generateFromString(userEmail ? userEmail : 'mail@gmail.com')}`}
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
            <MenuItem className="flex justify-between w-full gap-5 text-red-500" onClick={signOut}>
              Logout <LogoutIcon fontSize="25" />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
