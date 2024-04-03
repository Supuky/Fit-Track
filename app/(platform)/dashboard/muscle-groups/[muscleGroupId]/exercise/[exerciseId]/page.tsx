"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Form from "../_components/Form";
import useApi from "@/app/_hooks/useApi";
import { Exercise } from "@/types/workout";

interface ApiResponse {
  exercise: Exercise,
};

const ExerciseDetailPage = () => {
  const router = useRouter();
  const { muscleGroupId, exerciseId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");
  const api = useApi();

  const handleUpdateExerciseSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.put(`/api/muscle-groups/${muscleGroupId}/exercises/${exerciseId}`,{ name: exercise });

      alert("更新しました。");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("更新に失敗しました。");
    };
  };

  useEffect(() => {
    const fetcher = async() => {
      try {
        const response = await api.get<ApiResponse>(`/api/muscle-groups/${muscleGroupId}/exercises/${exerciseId}`);

        if(response) {
          const { exercise } =  response;
          const { muscleGroups } = exercise;
          setExercise(exercise.name);
          setMuscle(muscleGroups.name);
        };
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      }
    };

    fetcher();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muscleGroupId, exerciseId]);

  return (
    <Form 
      mode="edit"
      muscle={muscle}
      exercise={exercise}
      setExercise={setExercise}
      onSubmit={handleUpdateExerciseSubmit}
    />
  );
};

export default ExerciseDetailPage;