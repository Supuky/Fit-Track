"use client"

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Workout from './Workout';
import { Value } from '@/types/calender';
import { WorkoutExercise } from '@/types/workout';
import useApi from '@/app/_hooks/useApi';

interface Props {
  value: Value;
};

interface ApiResponse {
  workouts: WorkoutExercise[]
};

const Workouts: React.FC<Props> = ({
  value
}) => {
  const [workouts, setWorkouts] = useState<WorkoutExercise[]>([]);
  const api = useApi();

  useEffect(() => {
    if(!value) return;
    
    const dateFormat = format(value, "yyyy-MM-dd");
    
    const fetcher = async () => {
      try {
        const response: ApiResponse = await api.get(`/api/workouts?date=${dateFormat}`);
        const { workouts } = response;
        if(workouts) setWorkouts(workouts);
      } catch (error) {
        console.log(error);
        alert("取得に失敗しました。");
      };
    };

    fetcher();
  }, [value]);

  return (
    <div className="mt-8">
      {
        workouts?.map((workout) => (
          <Workout 
            key={workout.workoutDetailId}
            workout={workout}
          />
        ))
      }
    </div>
  );
};

export default Workouts;