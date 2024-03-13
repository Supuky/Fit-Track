"use client"

import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { Exercise, MuscleGroup } from "@/types/workout";
import { LineChart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const RecordsPage = () => {
  const { token } = useSupabaseSession();
  const [muscles, setMuscles] = useState<MuscleGroup[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if(!token) return;

    const fetcher = async() => {
      const response = await fetch("/api/records", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const { muscleGroups, exercises } = await response.json();

      console.log(muscleGroups, exercises);
      setMuscles(muscleGroups);
      setExercises(exercises);
    };

    fetcher();
  }, [token]);

  return(
    <>
      {
        muscles.map(muscle => (
          <>
            <div 
              className="flex items-center px-8 py-4 mt-6 rounded-xl max-w-[600px] m-auto bg-base-white text-base-black" 
              key={muscle.name}
            >
              { muscle.name }
            </div>
            {exercises.map(exercise => (
              muscle.name === exercise.muscleGroups.name ?
              <div key={exercise.id}>
                <Link
                  href={`/records/${exercise.id}`}
                  className="flex items-center justify-center gap-2 p-4 mt-4 rounded-xl shadow-xl max-w-[600px] m-auto bg-primary hover:bg-primary-pale text-base-white"
                >
                  <LineChart className="text-white"/>
                  {exercise.name}
                </Link>
              </div>
              :
              null
            )) }
          </>
        ))
      }
    </>
  );
};

export default RecordsPage;