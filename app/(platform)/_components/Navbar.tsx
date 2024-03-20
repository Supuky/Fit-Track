"use client"

import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Home, LineChart, Gauge, LogOut } from 'lucide-react';
import { supabase } from "@/utils/supabaseClient";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isSelected = (href: string) => {
    return pathname.includes(href)
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      {/* サイドバー pc tab */}
      <aside className="hidden bg-base-white fixed w-[280px] left-0 bottom-0 top-0 border-l border md:flex md:flex-col md:justify-between">
        <div>
          <Link href="/dashboard" className='p-4 flex gap-2 items-center'>
            <Image 
              src="/logo.svg"
              alt="Logo"
              height={34}
              width={34}
            />
            <h1 className="font-bold text-primary text-xl">FitTrack</h1>
          </Link>
          <Link 
            href="/dashboard"
            className={`flex items-center gap-4 mt-16 p-4 font-bold hover:bg-primary hover:text-base-white ${isSelected("dashboard") ? "text-primary" : "text-base-black"}`}
          >
            <Home />
            ホーム
          </Link>
          <Link 
            href="/records"
            className={`flex items-center gap-4 p-4 font-bold hover:bg-primary hover:text-base-white ${isSelected("records") ? "text-primary" : "text-base-black"}`}
          >
            <LineChart />
            記録
          </Link>
          <Link 
            href="/weights"
            className={`flex items-center gap-4 p-4 font-bold hover:bg-primary hover:text-base-white ${isSelected("weight") ? "text-primary" : "text-base-black"}`}
          >
            <Gauge />
            体重
          </Link>
        </div>
        <div>
        <button
            onClick={handleLogout}
            className={`flex items-center gap-4 w-full p-4 font-bold hover:bg-primary hover:text-base-white`}
          >
            <LogOut />
            ログアウト
          </button>
        </div>
      </aside>

      {/* sp */}
      <aside className="fixed bg-base-white flex justify-evenly items-center w-full left-0 bottom-0 border-l border md:hidden">
        <Link 
          href="/dashboard"
          className={`flex justify-center gap-4 p-4 font-bold hover:text-base-middle ${isSelected("dashboard") ? "text-primary" : "text-base-black"}`}
        >
          <Home />
        </Link>
        <Link 
          href="/records"
          className={`flex justify-center gap-4 p-4 font-bold hover:text-base-middle ${isSelected("records") ? "text-primary" : "text-base-black"}`}
        >
          <LineChart />
        </Link>
        <Link 
          href="/weights"
          className={`flex justify-center gap-4 p-4 font-bold hover:text-base-middle ${isSelected("weight") ? "text-primary" : "text-base-black"}`}
        >
          <Gauge />
        </Link>
        <button
            onClick={handleLogout}
            className={`blcok p-4 font-bold hover:text-base-middle`}
          >
            <LogOut />
          </button>
      </aside>
    </>
  )
}

export default Navbar;