"use client"

import { useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Form from "../_components/Form";
import { useRouter } from "next/navigation";

const WeightsNewPage = () => {
  const router = useRouter()
  const { token } = useSupabaseSession();
  const [weight, setWeight] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [date, setDate] = useState("");

  const handleCreateWeightSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!token) return;

    const response = await fetch(`/api/weights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ weight: weight, bodyFatPercentage: bodyFatPercentage, date: date }),
    });

    if(response.status === 200) {
      alert("作成しました。");
      router.push("/weights");
    } else {
      alert("新規作成できませんでした。")
    };
  };

  return (
    <div className="flex justify-center items-center h-svh">
      <Form 
        mode="new"
        weight={weight}
        setWeight={setWeight}
        bodyFatPercentage={bodyFatPercentage}
        setBodyFatPercentage={setBodyFatPercentage}
        date={date} 
        setDate={setDate}
        onSubmit={handleCreateWeightSubmit}
      />
    </div>
  );
};

export default WeightsNewPage;