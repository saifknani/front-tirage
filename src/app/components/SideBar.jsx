import React from "react";
import SideBarItem from "./smallComponents/SideBarItem";
import Link from "next/link";
import { SwipeableDrawer } from "@mui/material";
import { usePathname } from "next/navigation";
const SideBar = ({ open, setOpen }) => {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden  min-h-screen gap-8 w-[14%] h-full pt-6 bg-white xl:flex flex-col items-center border-r border-r-[#A2CCF3] ">
        <SideBarItem
          active={pathname === "/asset-page" ? true : false}
          icon="assets/icons/assets.svg"
          label={"Participants"}
          path="/asset-page"
        />

        <SideBarItem
          active={pathname === "/concour" ? true : false}
          icon="assets/icons/assets.svg"
          label={"concours "}
          path="/concour"
        />
      </div>

      <div className="xl:hidden">
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          style={{
            width: "0%",
          }}
        >
          
            <SideBarItem
              icon="assets/icons/assets.svg"
              label={"Participants"}
              path="/asset-page"
            />
        
        </SwipeableDrawer>
      </div>
    </>
  );
};

export default SideBar;
