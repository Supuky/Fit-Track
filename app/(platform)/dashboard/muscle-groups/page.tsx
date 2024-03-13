"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { Dumbbell } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { MuscleGroup } from '@/types/workout';

const MuscleGroupsPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const { token } = useSupabaseSession();
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);


  useEffect(() => {
    if(!token) return;

    const fetcher = async () => {
      const response = await fetch("/api/muscle-groups", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        }
      });

      const { muscleGroups } = await response.json();

      setMuscleGroups(muscleGroups);
    };

    fetcher();
  }, [token]);

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