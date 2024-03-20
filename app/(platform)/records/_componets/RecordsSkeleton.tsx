import React from 'react'

function RecordsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="max-w-[600px] h-14 mt-6 bg-base-white rounded-3xl  m-auto md:w-[600px]"></div>
      <div className="max-w-[600px] h-14 mt-4 bg-base-white rounded-xl shadow-xl m-auto md:w-[600px]"></div>
      <div className="max-w-[600px] h-14 mt-4 bg-base-white rounded-xl shadow-xl m-auto md:w-[600px]"></div>
      <div className="max-w-[600px] h-14 mt-4 bg-base-white rounded-xl shadow-xl m-auto md:w-[600px]"></div>
      <div className="max-w-[600px] h-14 mt-6 bg-base-white rounded-3xl  m-auto md:w-[600px]"></div>
      <div className="max-w-[600px] h-14 mt-4 bg-base-white rounded-xl shadow-xl m-auto md:w-[600px]"></div>
    </div>
  );
};

export default RecordsSkeleton;