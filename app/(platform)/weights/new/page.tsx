"use client"

import { useState } from "react";
import Form from "../_components/Form";
import { useRouter } from "next/navigation";
import useApi from "@/app/_hooks/useApi";

const WeightsNewPage = () => {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [date, setDate] = useState("");
  const api = useApi();

  const handleCreateWeightSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.post(`/api/weights`, { weight: weight, bodyFatPercentage: bodyFatPercentage, date: date });

      alert("作成しました。");
      router.push("/weights");
    } catch (error) {
      console.log(error);
      alert("新規作成できませんでした。");
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