"use client"

import { useState } from 'react';
import { Value } from '@/types/calender';
import { Plus } from 'lucide-react';
import WorkoutCalendar from './_components/WorkoutCalendar';
import Link from 'next/link';
import Workouts from './_components/Workouts';
import { format } from 'date-fns';

const DashboardPage = () => {
  const [value, setValue] = useState<Value>(new Date());

  const date = format(value!, "yyyy-MM-dd");

  return(
    <>
      <WorkoutCalendar value={value} onChange={setValue}/>
      <Link 
        href={`/dashboard/muscle-groups/?date=${date}`}
        className="mt-8 py-4 flex justify-center items-center gap-4 bg-primary hover:bg-primary-pale text-white rounded-xl shadow-xl max-w-[600px] m-auto"
      >
        <Plus />
        トレーニングを追加
      </Link>
      <Workouts value={value}/>
    </>
  );
};

export default DashboardPage;