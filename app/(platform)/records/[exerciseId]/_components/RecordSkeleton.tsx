import React from 'react';

function RecordSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="my-4 h-14 bg-base-white rounded-xl shadow-xl max-w-[600px] m-auto"></div>
      <div className="h-[50svh] bg-base-white rounded-xl shadow-xl max-w-[600px] m-auto"></div>
      <div className="mt-4 m-auto w-10/12 h-[34px] bg-base-white rounded-xl shadow-xl max-w-[600px]"></div>
    </div>
  );
};

export default RecordSkeleton;