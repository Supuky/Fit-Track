"use client";

import { useEffect, useState } from "react";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { WorkoutData } from "@/types/workout";

const WorkoutRecordPage = () => {
  const router = useRouter();
  const { token } = useSupabaseSession();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const { muscleGroupId, exerciseId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");
  // input をいくつ追加したカウント
  const [count, setCount] = useState(3);
  const countUp = () => setCount(count + 1);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    // input の value の 初期値を設置
    defaultValues: {
      exerciseId: exerciseId,
      workouts: [
        { weights: "", reps: "" },
        { weights: "", reps: "" },
        { weights: "", reps: "" },
      ],
      memo: "",
      date: date,
    },
  });

  // input を動的に増減させるための設定
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });

  // input を減らすボタンを押した時の処理
  const reduce = (index: number) => {
    if (count > 0) {
      remove(index);
      setCount(count - 1);
    }
  };

  const handleCreateWorkoutsSubmit = async (data: WorkoutData) => {
    if(!token) return;

    const response = await fetch(`/api/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
      body: JSON.stringify(data),
    });

    if(response.status === 200) {
      reset();
      alert("保存しました。")
      router.push("/dashboard");
    } else {
      alert("保存に失敗しました。");
    };
  };

  useEffect(() => {
    if (!token) return;

    const fetcher = async () => {
      const response = await fetch(
        `/api/muscle-groups/${muscleGroupId}/exercises/${exerciseId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token!,
          },
        }
      );

      const { exercise } = await response.json();
      const { muscleGroups } = exercise;
      setExercise(exercise.name);
      setMuscle(muscleGroups.name);
    };

    fetcher();
  }, [muscleGroupId, exerciseId, token]);

  return (
    <form
      className="max-w-[600px] bg-base-white px-8 py-4 rounded-xl shadow-xl text-base-black  md:w-4/6"
      onSubmit={handleSubmit(handleCreateWorkoutsSubmit)}
    >
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="muscle" className="mr-4">
            部位
          </label>
        </div>
        <div>
          <input
            type="text"
            id="muscle"
            readOnly
            value={muscle}
            className="w-40 rounded-xl focus-visible:outline-white text-right"
          />
        </div>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="exercise">種目</label>
        </div>
        <div>
          <input
            type="text"
            id="exercise"
            readOnly
            value={exercise}
            className="w-40 rounded-xl focus-visible:outline-white text-right"
          />
        </div>
      </div>
      <div className="mb-4">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div
              className="mb-4 flex justify-between items-center"
            >
              <div className="mr-2">
                <span>{index + 1}セット</span>
              </div>
              <div className="flex justify-center items-center">
                <input
                  type="number"
                  className="w-16 rounded-lg focus-visible:outline-primary bg-base-background text-center"
                  {...register(`workouts.${index}.weights`, { required: true })}
                />
                <span className="ml-1 mr-2">kg</span>
                <input
                  type="number"
                  className="w-16 rounded-lg focus-visible:outline-primary bg-base-background text-center"
                  {...register(`workouts.${index}.reps`, { required: true })}
                />
                <span className="ml-1 mr-2">回</span>
                <button type="button" onClick={() => reduce(index)}>
                  <Trash2 className="w-5 hober:text-base-black hover:text-base-middle" />
                </button>
              </div>
            </div>
            {
              (errors.workouts && errors.workouts[index] && 
              (errors.workouts[index]!.weights || errors.workouts[index]!.reps)) && 
                <div className="text-right text-red-500 mt-[-8px]">
                  数字を入力してください。
                </div>
            }
          </div>
        ))}
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={() => [append({ reps: "", weights: "" }), countUp()]}
          >
            <Plus className="text-white bg-primary rounded-3xl hover:bg-primary-pale" />
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="memo" className="mr-4">
          メモ
        </label>
        <div>
          <textarea
            className="w-full bg-base-background rounded-xl focus-visible:outline-primary p-2"
            id="memo"
            {...register(`memo`)}
          ></textarea>
        </div>
      </div>
      <input type="hidden" {...register(`date`)}  />
      <button
        type="submit"
        className=" w-full py-2 bg-primary hover:bg-primary-pale text-white rounded-xl shadow-xl max-w-[600px] m-auto"
      >
        保存
      </button>
    </form>
  );
};

export default WorkoutRecordPage;