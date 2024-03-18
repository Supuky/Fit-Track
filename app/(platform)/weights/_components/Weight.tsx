"use client"

import Link from 'next/link';
import React from 'react';
import { PersonStanding } from 'lucide-react';

interface Props {
  id: number,
  weight: number,
  recordedAt: string
};

const Weight: React.FC<Props> = ({
  id,
  weight,
  recordedAt
}) => {
  return (
    <Link
      href={`/weights/${id}`}
      className="flex justify-between items-center px-8 py-4 mt-4 rounded-xl shadow-xl max-w-[600px] m-auto bg-base-white
      text-base-black/90 hover:opacity-80"
    >
      <div>
      <PersonStanding size={30} className="text-primary"/>
      <p className="">{weight}kg</p>
      </div>
      <p className="text-sm text-base-middle">{recordedAt}</p>
    </Link>
  )
}

export default Weight;