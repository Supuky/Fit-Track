"use client"

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Link from "next/link";
import { Dumbbell, Plus } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Exercise } from "@/types/workout";

const ExercisesPage = () => {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const { token } = useSupabaseSession();
  const { muscleGroupId } = useParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if(!token) return;

    const fetcher = async () => {
      const response = await fetch(`/api/muscle-groups/${muscleGroupId}/exercises`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
      });

      const { exercises } = await response.json();

      setExercises(exercises);
    };

    fetcher();
  }, [muscleGroupId, token]);

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