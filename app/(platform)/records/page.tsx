"use client"

import useApi from "@/app/_hooks/useApi";
import { Exercise, MuscleGroup } from "@/types/workout";
import { LineChart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";


const RecordsPage = () => {
  const [muscles, setMuscles] = useState<MuscleGroup[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const api = useApi();

  useEffect(() => {
    const fetcher = async() => {
      try {
        const response = await api.get("/api/records");
  
        const { muscleGroups, exercises } = response;
  
        setMuscles(muscleGroups);
        setExercises(exercises);
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      };
    };

    fetcher();
  }, []);

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