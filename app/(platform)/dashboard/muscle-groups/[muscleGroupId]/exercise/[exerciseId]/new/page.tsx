"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { ColorRing } from "react-loader-spinner";
import { Exercise, WorkoutData } from "@/types/workout";
import useApi from "@/app/_hooks/useApi";

interface ApiResponse {
  exercise: Exercise,
};

const WorkoutRecordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const date = searchParams.get("date");
  const { muscleGroupId, exerciseId } = useParams();
  const [exercise, setExercise] = useState("");
  const [muscle, setMuscle] = useState("");
  const api = useApi();
  // input をいくつ追加したカウント
  const [count, setCount] = useState(3);
  const countUp = () => setCount(count + 1);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
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
    try {
      await api.post(`/api/workouts`, data);

      alert("保存しました。");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      alert("保存できませんでした。");
    };
  };

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await api.get<ApiResponse>(`/api/muscle-groups/${muscleGroupId}/exercises/${exerciseId}`);

        if(response) {
          const { exercise } = response;
          const { muscleGroups } = exercise;
          setExercise(exercise.name);
          setMuscle(muscleGroups.name);
        };
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      };
    };

    fetcher();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [muscleGroupId, exerciseId]);

  return (
    <form
      className="max-w-[600px] bg-base-white mt-10 px-8 py-4 rounded-xl shadow-xl text-base-black  md:w-4/6"
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
                  step={"0.1"}
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
                  <Trash2 className="w-5 text-base-black/70 hover:text-base-middle" />
                </button>
              </div>
            </div>
            {
              (errors.workouts && errors.workouts[index] && 
              (errors.workouts[index]!.weights || errors.workouts[index]!.reps)) && 
                <p className="text-right text-red-500 mt-[-8px] text-sm">
                  数字を入力してください。
                </p>
            }
          </div>
        ))}
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={() => [append({ reps: "", weights: "" }), countUp()]}
          >
            <Plus className="text-white bg-primary rounded-3xl hover:bg-primary/70" />
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
      {
        isSubmitting ? 
        <button
            type="submit"
            disabled
            className="w-full py-2  bg-primary-pale text-white rounded-xl shadow-xl max-w-[600px] m-auto flex justify-center opacity-80"
          >
            <ColorRing
              visible={true}
              height="25"
              width="25"
              ariaLabel="color-ring-loading"
              wrapperStyle={{ textAlign: "center" }}
              wrapperClass="color-ring-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          </button>
        :
        <button
        type="submit"
        className=" w-full py-2 bg-primary hover:bg-primary-pale text-white rounded-xl shadow-xl max-w-[600px] m-auto"
      >
        保存
      </button>
      }
    </form>
  );
};

export default WorkoutRecordPage;