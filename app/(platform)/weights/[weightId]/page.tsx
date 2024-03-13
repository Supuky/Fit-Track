"use client"

import { useEffect, useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import Form from "../_components/Form";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";

const WeightPage = () => {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const { weightId } = useParams();
  const [weight, setWeight] = useState("");
  const [bodyFatPercentage, setBodyFatPercentage] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if(!token) return;

    const fetcher = async() => {
      const response = await fetch(`/api/weights/${weightId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token!,
        },
      });

      const { weights } = await response.json();
      const { weight, bodyFatPercentage, measuredAt } = weights;

      setWeight(weight);
      setBodyFatPercentage(bodyFatPercentage);
      setDate(format(measuredAt, "yyyy-MM-dd"));
    };

    fetcher();
  }, [token, weightId]);

  const handleUpdateWeightSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if(!token) return;

    const response = await fetch(`/api/weights/${weightId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ weight: weight, bodyFatPercentage: bodyFatPercentage, date: date }),
    });

    if(response.status === 200) {
      alert("更新しました。");
      router.push("/weights");
    } else {
      alert("更新に失敗しました。");
    };
  };

  const handleDeleteWeightsSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if(!token) return;

    if (!confirm('削除しますか？')) return;

    const response = await fetch(`/api/weights/${weightId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        Authorization: token!,
      },
    });

    if(response.status === 200) {
      alert("削除しました。");
      router.push("/dashboard");
    } else {
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