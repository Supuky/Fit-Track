"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Form from "../_components/Form";

const ExerciseNewPage = () => {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { muscleGroupId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");

  const handleCreateExerciseSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!token) return;

    const response = await fetch(`/api/muscle-groups/${muscleGroupId}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ name: exercise }),
    });
    
    if(response.status === 200) {
      alert("作成しました。");
      router.back();
    } else {
      alert("保存に失敗しました。");
    };
  };

  useEffect(() => {
    if(!token) return;
    const fetcher = async() => {
      const response = await fetch(`/api/muscle-groups/${muscleGroupId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
      });

      const { muscleGroups } = await response.json();
      setMuscle(muscleGroups.name);
    };

    fetcher();
  }, [muscleGroupId, token]);

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