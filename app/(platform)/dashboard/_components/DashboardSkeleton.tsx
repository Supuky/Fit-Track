"use client"

import React from 'react';

function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="max-w-[600px] h-80 bg-base-white rounded-xl shadow-xl md:w-[600px] md:m-auto"></div>
      <div className="mt-8 h-14 bg-base-white rounded-xl shadow-xl max-w-[600px] m-auto md:w-[600px]"></div>
    </div>
  );
};

export default DashboardSkeleton;