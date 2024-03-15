"use client"

import Link from "next/link";
import { Dumbbell, Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Exercise } from "@/types/workout";
import useApi from "@/app/_hooks/useApi";

interface ApiResponse {
  exercises: Exercise[],
};

const ExercisesPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const { muscleGroupId } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const api = useApi();

  useEffect(() => {

    const fetcher = async () => {
      try {
        const response = await api.get<ApiResponse>(`/api/muscle-groups/${muscleGroupId}/exercises`);
  
        if(response) {
          const { exercises } = response;
    
          setExercises(exercises);
        };
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      };
    };

    fetcher();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muscleGroupId]);

  return (
    <div className="max-w-[600px]">
      {
        exercises.map(exercise => (
          <Link 
            key={exercise.id}
            // href={`/dashboard/muscle-groups/${muscleGroupId}/exercise/${exercise.id}`}
            href={`/dashboard/muscle-groups/${muscleGroupId}/exercise/${exercise.id}/new?date=${date}`}
            className="w-72 py-4 mb-8 flex items-center justify-center gap-4 bg-white rounded-xl shadow-xl text-base-black hover:bg-primary hover:text-base-white md:w-96"
          >
            <Dumbbell />
            {exercise.name}
          </Link>
        ))
      }
      <Link 
        href={`/dashboard/muscle-groups/${muscleGroupId}/exercise/new`}
        className="w-72 py-4 flex flex-col items-center gap-2 bg-white rounded-xl shadow-xl text-base-black hover:bg-primary hover:text-base-white md:w-96"
      >
        <Plus />
      </Link>
    </div>
  )
};

export default ExercisesPage;