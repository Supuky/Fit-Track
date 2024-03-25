"use client"
import React from 'react';

interface Props {
  mode: "new" | "edit",
  weight: string,
  bodyFatPercentage: string,
  date: string,
  setWeight: (weight: string) => void,
  setBodyFatPercentage: (bodyFatPercentage: string) => void,
  setDate: (date: string) => void,
  onSubmit: (event: React.FormEvent) => Promise<void>,
  onDelete?: (event: React.FormEvent) => Promise<void>
};

const Form: React.FC<Props> = ({
  mode,
  weight,
  bodyFatPercentage,
  date,
  setWeight,
  setBodyFatPercentage,
  setDate,
  onSubmit,
  onDelete,
}) => {
  return (
    <form 
      className="max-w-[600px] bg-base-white p-8 rounded-xl shadow-xl text-base-black"
      onSubmit={onSubmit}
    >
      <div className="mb-4 flex justify-between items-center">
        <label htmlFor="weight" className="mr-4">体重(kg)</label>
        <input 
          type="number" 
          id="weight" 
          step={"0.1"}
          required
          className="p-2 rounded-xl focus-visible:outline-primary bg-base-background text-right"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="mb-8 flex justify-between items-center">
        <label htmlFor="bodyFatPercentage" className="mr-4">体脂肪(%)</label>
        <input 
          type="number" 
          id="bodyFatPercentage"  
          step={"0.1"}
          className="p-2 rounded-xl focus-visible:outline-primary bg-base-background text-right"
          value={bodyFatPercentage}
          onChange={(e) => setBodyFatPercentage(e.target.value)}
        />
      </div>
      <div className="mb-8 flex justify-between items-center">
        <label htmlFor="date" className="mr-4">測定日</label>
        <input 
          type="date" 
          id="date"  
          className="p-2 rounded-xl focus-visible:outline-primary bg-base-background"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
      {
        mode === "edit" ?
        <button
          type="button"
          className="mt-4 w-full py-2 bg-red-500 hover:bg-red-400 text-white rounded-xl shadow-xl max-w-[600px] m-auto"
          onClick={onDelete}
        >
          削除
        </button>
        :
        null
      }
    </form>
  );
};

export default Form;