import Link from 'next/link';
import React from 'react';

const SideBarItem = ({ label, path, icon, active }) => {
  return (
    <div
      className={`w-full flex  gap-3 items-center pl-0`}
    >
      {active && <img src="assets/icons/active.svg" className="w-2 h-10" />}
      <div className={`flex justify-normal items-center gap-4 ${active?'':'pl-6'} pl-1`}>
        <img src={icon} className="w-6 h-6" />

        <Link
          href={path ? path : ''}
          className={`text-[#2E75B5] ${
            active ? 'font-extrabold' : 'font-medium'
          } `}
        >
          {label}
        </Link>
      </div>
    </div>
  );
};

export default SideBarItem;
