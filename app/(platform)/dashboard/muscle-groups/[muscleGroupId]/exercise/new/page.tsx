"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Form from "../_components/Form";
import useApi from "@/app/_hooks/useApi";

const ExerciseNewPage = () => {
  const router = useRouter();
  const { muscleGroupId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");
  const api = useApi();

  const handleCreateExerciseSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post(`/api/muscle-groups/${muscleGroupId}/exercises`, { name: exercise });

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
        const response = await api.get(`/api/muscle-groups/${muscleGroupId}/`);
  
        const { muscleGroups } = response;
  
        setMuscle(muscleGroups.name);
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      };
    };

    fetcher();
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