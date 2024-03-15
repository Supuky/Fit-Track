"use client"

import { useEffect, useState } from "react";
import Form from "../_components/Form";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import useApi from "@/app/_hooks/useApi";

const WeightPage = () => {
  const router = useRouter();
  const { weightId } = useParams();
  const [weight, setWeight] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [date, setDate] = useState("");
  const api = useApi();

  useEffect(() => {
    const fetcher = async() => {
      try {
        const response = await api.get(`/api/weights/${weightId}`);
  
        const { weights }  = response;
        const { weight, bodyFatPercentage, measuredAt } = weights;
  
        setWeight(weight);
        setBodyFatPercentage(bodyFatPercentage);
        setDate(format(measuredAt, "yyyy-MM-dd"));
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。")
      };
    };

    fetcher();
  }, [weightId]);

  const handleUpdateWeightSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await api.put(`/api/weights/${weightId}`,{ weight: weight, bodyFatPercentage: bodyFatPercentage, date: date });
      
      alert("更新しました。");
      router.push("/weights");
    } catch (error) {
      console.log(error);
      alert("更新に失敗しました。");
    };
  };

  const handleDeleteWeightsSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm('削除しますか？')) return;

    try {
      const response = await api.del(`/api/weights/${weightId}`);
      
      alert("削除しました。");
      router.push("/weights");
    } catch (error) {
      console.log(error);
      alert("削除に失敗しました。");
    };
  };

  return (
    <div className="flex justify-center items-center h-svh">
      <Form 
        mode="edit"
        weight={weight}
        setWeight={setWeight}
        bodyFatPercentage={bodyFatPercentage}
        setBodyFatPercentage={setBodyFatPercentage}
        date={date} 
        setDate={setDate}
        onSubmit={handleUpdateWeightSubmit}
        onDelete={handleDeleteWeightsSubmit}
      />
    </div>
  );
};

export default WeightPage;