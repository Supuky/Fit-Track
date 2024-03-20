import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-lg mx-auto flex items-center w-full justify-between">
        <Link href="/" className='flex gap-2 items-center'>
          <Image 
            src="/logo.svg"
            alt="Logo"
            height={34}
            width={34}
          />
          <h1 className="font-bold text-primary text-xl">FitTrack</h1>
        </Link>
        <div className="space-x-4 md:w-auto">
          <Link href="/login" className="px-4 py-2.5  bg-primary hover:bg-primary-pale text-white text-sm font-bold rounded-lg">
            ログイン
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;