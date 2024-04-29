'use client';
import React, { useState } from 'react';
import DashboardLayout from '../dashboard/layout';
import SecuritySettings from '../components/SecuritySettings';
import PreferencesSettings from '../components/PreferencesSettings';

function page() {
  const [navActive, setNavActive] = useState('Preferences');
  return (
    <DashboardLayout>
      <div className="flex w-full flex-col  justify-start  items-center p-4 ">
        <div className="w-full flex items-center gap-10 p-2 justify-start">
          <div
            className="flex flex-col items-center justify-around cursor-pointer"
            onClick={() => {
              setNavActive('Preferences');
            }}
          >
            <span className="text-[#140E59] text-base font-medium">
              Preferences
            </span>
            {navActive == 'Preferences' && (
              <div
                className="bg-[#140E59] h-[3px] w-full"
                style={{
                  border: '10px, 10px, 0px, 0px',
                }}
              ></div>
            )}
          </div>
          <div
            className="flex flex-col items-center justify-around cursor-pointer"
            onClick={() => {
              setNavActive('Security');
            }}
          >
            <span className="text-[#140E59] text-base font-medium">
              Security
            </span>
            {navActive == 'Security' && (
              <div
                className="bg-[#140E59] h-[3px] w-full"
                style={{
                  border: '10px, 10px, 0px, 0px',
                }}
              ></div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-start items-start">
          {navActive == 'Security' && <SecuritySettings />}
          {navActive == 'Preferences' && <PreferencesSettings />}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default page;
