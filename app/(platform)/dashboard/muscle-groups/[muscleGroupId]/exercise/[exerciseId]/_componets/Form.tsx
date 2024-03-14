// onSubmit内にreset()を実行したいためにこのコンポーネントを使っていない
"use client"

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { WorkoutData } from '@/types/workout';

interface Props {
  mode: "new" | "edit",
  muscle: string,
  exercise: string,
  exerciseId: string | string[],
  onSubmit: (data: WorkoutData) => Promise<void>
};

const Form: React.FC<Props> = ({
  mode,
  muscle,
  exercise,
  exerciseId,
  // onSubmit
}) => {
  // input をいくつ追加したカウント
  const [count, setCount] = useState(3);
  const countUp = () => setCount(count + 1);

  const { register, handleSubmit, reset, control } = useForm({
    // input の value の 初期値を設置
    defaultValues: {
      exerciseId: exerciseId,
      workouts: [
        { weights: "", reps: "" }, 
        { weights: "", reps: "" }, 
        { weights: "", reps: "" }, 
      ],
      memo: "",
    },
  });

  // input を動的に増減させるための設定  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workouts",
  });

  // input を減らすボタンを押した時の処理
  const reduce = () => {
    if (count > 0) {
      remove(count);
      setCount(count - 1);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    // 送信後 input の入力欄を初期化
    reset();
  };

  return (
    <form 
      className="max-w-[600px] bg-base-white p-8 rounded-xl shadow-xl text-base-black"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-4">
        <label htmlFor="muscle" className="mr-4">部位</label>
        <input 
          type="text" 
          id="muscle" 
          readOnly 
          value={muscle}
          className="p-2 rounded-xl focus-visible:outline-primary bg-base-background"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exercise" className="mr-4">種目</label>
        <input 
          type="text" 
          id="exercise" 
          readOnly
          value={exercise} 
          className="p-2 rounded-xl focus-visible:outline-primary bg-base-background"
        />
      </div>
      <div className="mb-8">
        {fields.map((field, index) => (
          <div className="mb-4" key={field.id}>
            <label htmlFor={`tasks.${index}.reps`} className="mr-4">{index + 1}セット</label>
            <input 
              type="number"
              className="p-2 w-16 rounded-xl focus-visible:outline-primary bg-base-background"
              {...register(`workouts.${index}.weights`)}
            />
            <span>kg</span>
            <input 
              type="number"
              className="p-2 w-16 rounded-xl focus-visible:outline-primary bg-base-background"
              id={`tasks.${index}.reps`}
              {...register(`workouts.${index}.reps`)}
            />
            <span>回</span>
            <button type="button" onClick={reduce}>
              <Trash2 />
            </button>
          </div>
        ))}
      <button 
        type='button' 
        onClick={() => [append({ reps: "", weights: "" }), countUp()]}
      >
        <Plus />
      </button>
      </div>
      <div className="mb-8">
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
      <button type="submit">送信</button>
    </form>
  );
}

export default Form;