'use client';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Link from 'next/link';

const Wallet = () => {
  const URL_ADDRESS = 'https://sepolia.etherscan.io/address/';
  const { activeProfile } = useContext(UserContext);
  const walletAddress =
    activeProfile && activeProfile.wallet
      ? JSON.parse(activeProfile?.wallet).address
      : '';
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(document.getElementById('walletAddress').innerHTML)
      .then(() => {
        setIsCopied(true);
        // Automatically reset isCopied after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      });
  };

  return (
    <div className="flex flex-col items-start">
      <div className="w-full flex items-center gap-2">
        <span
          id="walletNumber"
          className="text-[#000] font-bold sm:text-[16px] text-[13px] leading-normal"
        >
          Wallet Number:
        </span>
        <img
          src="assets/icons/copy.svg"
          className={`w-3 h-3 cursor-pointer ${
            isCopied ? 'opacity-50' : 'opacity-100'
          }`}
          onClick={!isCopied ? copyToClipboard : null}
          alt="Copy to clipboard"
        />
        {isCopied && <span className="text-green-500 text-xs">Copied!</span>}
      </div>
      <Link
        id="walletAddress"
        target="_blank"
        href={`${URL_ADDRESS + walletAddress}`}
        className="text-[#140E59] font-light text-[8px] leading-normal"
      >
        {activeProfile && activeProfile.wallet
          ? JSON.parse(activeProfile?.wallet).id
          : ''}
      </Link>
    </div>
  );
};

export default Wallet;
