"use client"

import { useRouteGuard } from "../_hooks/useRouteGuard";
import Navbar from "./_components/Navbar";

const PlatformLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  useRouteGuard();

  return (
    <>
      {/* サイドバー */}
      <Navbar />
      {/* メインエリア */}
      <div className="p-4 mb-[58px] md:ml-[280px] md:mb-0">  {children}
      </div>
    </>
  );
};

export default PlatformLayout;