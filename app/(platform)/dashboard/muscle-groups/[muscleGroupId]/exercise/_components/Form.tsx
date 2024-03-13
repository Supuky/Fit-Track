"use client"
import React from 'react';

interface Props {
  mode: "new" | "edit",
  muscle: string,
  exercise: string,
  setExercise: (exercise: string) => void,
  onSubmit: (event: React.FormEvent) => Promise<void>
};

const Form: React.FC<Props> = ({
  mode,
  muscle,
  exercise,
  setExercise,
  onSubmit
}) => {
  return (
    <form 
      className="max-w-[600px] bg-base-white p-8 rounded-xl shadow-xl text-base-black"
      onSubmit={onSubmit}
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
      <div className="mb-8">
        <label htmlFor="exercise" className="mr-4">種目</label>
        <input 
          type="text" 
          id="exercise" 
          value={exercise} 
          className="p-2 rounded-xl focus-visible:outline-primary bg-base-background"
          onChange={(e) => setExercise(e.target.value)} 
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-primary hover:bg-primary-pale text-white rounded-xl shadow-xl max-w-[600px] m-auto "
      >
        {
          mode === "new" ? "作成" : "変更"
        }
      </button>
    </form>
  );
};

export default Form;