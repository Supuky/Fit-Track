"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Form from "../_components/Form";
import useApi from "@/app/_hooks/useApi";
import { MuscleGroup } from "@/types/workout";

interface ApiResponse {
  muscleGroups: MuscleGroup,
};

const ExerciseNewPage = () => {
  const router = useRouter();
  const { muscleGroupId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");
  const api = useApi();

  const handleCreateExerciseSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post(`/api/muscle-groups/${muscleGroupId}/exercises`, { name: exercise });

      alert("作成しました。");
      router.back();
    } catch (error) {
      console.log(error);
      alert("新規作成できませんでした。");
    };
  };

  useEffect(() => {
    const fetcher = async() => {
      try {
        const response = await api.get<ApiResponse>(`/api/muscle-groups/${muscleGroupId}/`);
  
        if(response) {
          const { muscleGroups } = response;
    
          setMuscle(muscleGroups.name);
        };
      } catch (error) {
        console.error(error);
      };
    };

    fetcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muscleGroupId]);

  return (
    <>
      <Form 
        mode="new"
        muscle={muscle}
        exercise={exercise}
        setExercise={setExercise}
        onSubmit={handleCreateExerciseSubmit}
      />
    </>
  );
};

export default ExerciseNewPage;