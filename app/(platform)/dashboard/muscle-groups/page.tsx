"use client"

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { MuscleGroup } from '@/types/workout';
import useApi from '@/app/_hooks/useApi';

interface ApiResponse {
  muscleGroups: MuscleGroup[],
};

const MuscleGroupsPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const api = useApi();

  useEffect(() => {
    const fetcher = async () => {
      const response = await api.get<ApiResponse>("/api/muscle-groups");

      if(response) {
        const { muscleGroups } = response;
        setMuscleGroups(muscleGroups);
      }
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center gap-8 flex-wrap max-w-[600px] mt-10">
      {
        muscleGroups?.map(muscle => (
          <Link 
            key={muscle.id}
            href={`/dashboard/muscle-groups/${muscle.id}/exercise?date=${date}`}
            className="w-[120px] p-8 flex flex-col items-center gap-2 bg-white rounded-xl shadow-xl text-base-black/90 hover:opacity-80"
          >
              <Dumbbell size={30} className="rotate-[135deg] text-primary"/>
              {muscle.name}
          </Link>
        ))
      }
    </div>
  );
};

export default MuscleGroupsPage;