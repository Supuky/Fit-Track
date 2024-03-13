"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Form from "../_components/Form";

const ExerciseDetailPage = () => {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { muscleGroupId, exerciseId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");

  const handleUpdateExerciseSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!token) return;

    const response = await fetch(`/api/muscle-groups/${muscleGroupId}/exercises/${exerciseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name: exercise }),
    });

    if(response.status === 200) {
      alert("更新しました。");
      router.back();
    } else {
      alert("保存に失敗しました。");
    };
  };

  useEffect(() => {
    if(!token) return;

    const fetcher = async() => {
      const response = await fetch(`/api/muscle-groups/${muscleGroupId}/exercises/${exerciseId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
      });

      const { exercise } = await response.json();
      const { muscleGroups } = exercise;
      setExercise(exercise.name);
      setMuscle(muscleGroups.name);
    };

    fetcher();
  }, [muscleGroupId, exerciseId, token]);

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