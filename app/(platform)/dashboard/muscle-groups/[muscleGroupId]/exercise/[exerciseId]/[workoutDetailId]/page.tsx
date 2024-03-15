"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { SetDetail, WorkoutUpdateData } from "@/types/workout";
import useApi from "@/app/_hooks/useApi";

const WorkoutDetailPage = () => {
  const router = useRouter();
  const { muscleGroupId, exerciseId, workoutDetailId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");
  const [Details, setDetails] = useState<SetDetail[]>([]);
  const api = useApi();

  // input をいくつ追加したカウント
  const [count, setCount] = useState(0);
  const countUp = () => setCount(count + 1);

  const { register, handleSubmit, reset, control, setValue } = useForm({
    // input の value の 初期値を設置
    defaultValues: {
      exerciseId: exerciseId,
      workouts: [
        {reps: "", weight: ""}
      ],
      memo: "",
    },
  });

  const handleUpdateWorkoutsSubmit = async (data: WorkoutUpdateData) => {
    try {
      const response = await api.put(`/api/workouts/${workoutDetailId}/${exerciseId}`, data);
      
      alert("更新しました。");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("更新に失敗しました。");
    };
  };

  useEffect(() => {
    const fetcher = async() => {
      const response = await api.get(`/api/muscle-groups/${muscleGroupId}/exercises/${exerciseId}`);

      const { exercise } = response;
      const { muscleGroups } = exercise;
      setExercise(exercise.name);
      setMuscle(muscleGroups.name);
    };

    fetcher();
  }, [muscleGroupId, exerciseId]);

  useEffect(() => {
    const fetcher = async() => {
      const response = await api.get(`/api/workouts/${workoutDetailId}/${exerciseId}`);

      const { workoutDetails } = response;
      const { setDetails: setDetailsData } = workoutDetails;
      setDetails(setDetailsData);

      // フェッチしたデータをフォームに設定
      for (const [index, detail] of setDetailsData.entries()) {
        setValue(`workouts[${index}].reps` as `workouts.${number}.reps`, detail.reps);
        setValue(`workouts[${index}].weight` as `workouts.${number}.weight`, detail.weight);
      }

      // フェッチしたデータを元にフォームの初期値をリセット
      reset({
        exerciseId: exerciseId,
        workouts: setDetailsData,
        memo: workoutDetails.memo,
      });
    };

    fetcher();
  }, [workoutDetailId, exerciseId]);

  // Detailsが更新されたときにsetCountを呼び出す
  useEffect(() => {
    setCount(Details.length);
  }, [Details]);

  // input を動的に増減させるための設定
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });

  // input を減らすボタンを押した時の処理
  const reduce = (index: number) => {
    console.log(index);
    if (count > 0) {
      remove(index);
      setCount(count - 1);
    };
  };

  const handleDeleteWorkoutsSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if (!confirm('削除しますか？')) return;

    try {
      const response = await api.del(`/api/workouts/${workoutDetailId}/${exerciseId}`);
      
      alert("削除しました。");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("削除に失敗しました。");
    };
  };

  return(
    <>
      <form 
      className="max-w-[600px] bg-base-white px-8 py-4 rounded-xl shadow-xl text-base-black  md:w-4/6"
      onSubmit={handleSubmit(handleUpdateWorkoutsSubmit)}
      >
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="muscle">部位</label>
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
          <div className="mb-2 flex justify-between items-center" key={field.id}>
            <div className="mr-4">
              <span>{index + 1}セット</span>
            </div>
            <div className="flex justify-center items-center">
              <input 
                type="number"
                className="w-16 rounded-lg focus-visible:outline-primary bg-base-background text-center"
                {...register(`workouts.${index}.weight`)}
              />
              <span className="ml-1 mr-2">kg</span>
              <input 
                type="number"
                className="w-16 rounded-lg focus-visible:outline-primary bg-base-background text-center"
                id={`tasks.${index}.reps`}
                {...register(`workouts.${index}.reps`)}
              />
              <span className="ml-1 mr-2">回</span>
              <button type="button" onClick={() => reduce(index)}>
                <Trash2 className="w-5 hober:text-base-black hover:text-base-middle"/>
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-center items-center">
          <button 
            type='button' 
            onClick={() => [append({ reps: "", weight: "" }), countUp()]}
          >
            <Plus className="text-white bg-primary rounded-3xl hover:bg-primary-pale"/>
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="memo" className="mr-4">メモ</label>
        <div>
          <textarea 
            className="w-full bg-base-background rounded-xl focus-visible:outline-primary p-2"
            id="memo"
            {...register(`memo`)}
          >
          </textarea>
        </div>
      </div>
      <button 
        type="submit"
        className="w-full py-2 bg-primary hover:bg-primary-pale text-white rounded-xl shadow-xl max-w-[600px] m-auto"
      >
        更新
      </button>
      <button 
        type="button"
        className="mt-4 w-full py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl shadow-xl max-w-[600px] m-auto"
        onClick={handleDeleteWorkoutsSubmit}
      >
        削除
      </button>
    </form>
    </>
  );
};

export default WorkoutDetailPage;