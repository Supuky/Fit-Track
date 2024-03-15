"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { MuscleGroup } from '@/types/workout';
import useApi from '@/app/_hooks/useApi';

const MuscleGroupsPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const api = useApi();

  useEffect(() => {
    const fetcher = async () => {
      const response = await api.get("/api/muscle-groups");

      const { muscleGroups } = response;

      setMuscleGroups(muscleGroups);
    };

    fetcher();
  }, [])

  return (
    <div className="flex justify-center items-center gap-8 flex-wrap max-w-[600px]">
      {
        muscleGroups.map(muscle => (
          <Link 
            key={muscle.id}
            href={`/dashboard/muscle-groups/${muscle.id}/exercise?date=${date}`}
            className="p-12 flex flex-col items-center gap-2 bg-white rounded-xl shadow-xl text-base-black hover:bg-primary hover:text-base-white"
          >
            <Dumbbell />
            {muscle.name}
          </Link>
        ))
      }
    </div>
  );
};

export default MuscleGroupsPage;