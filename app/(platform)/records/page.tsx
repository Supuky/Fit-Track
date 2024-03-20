"use client"

import useApi from "@/app/_hooks/useApi";
import { Exercise, MuscleGroup } from "@/types/workout";
import { LineChart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import RecordsSkeleton from "./_componets/RecordsSkeleton";

interface ApiResponse {
  muscleGroups: MuscleGroup[],
  exercises: Exercise[]
};

const RecordsPage = () => {
  const [muscles, setMuscles] = useState<MuscleGroup[] | null>(null);
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const api = useApi();

  useEffect(() => {
    const fetcher = async() => {
      try {
        const response = await api.get<ApiResponse>("/api/records");
  
        if(response) {
          const { muscleGroups, exercises } = response;
    
          setMuscles(muscleGroups);
          setExercises(exercises);
        };
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      };
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(!muscles || !exercises) return <RecordsSkeleton />;

  return(
    <>
      {
        muscles.map(muscle => (
          <>
            <div 
              className="flex items-center px-8 py-4 mt-6 rounded-3xl max-w-[600px] m-auto  bg-primary text-base-white" 
              key={muscle.name}
            >
              { muscle.name }
            </div>
            {exercises.map(exercise => (
              muscle.name === exercise.muscleGroups.name ?
              <div key={exercise.id}>
                <Link
                  href={`/records/${exercise.id}`}
                  className="flex items-center gap-2 px-8 py-4 mt-4 rounded-xl shadow-xl max-w-[600px] m-auto  bg-base-white text-base-black/90 font-bold"
                >
                  <LineChart className="text-primary"/>
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