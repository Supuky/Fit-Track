"use client"

import React, { useEffect, useState } from 'react';
import { Value } from '@/types/calender';
import { useSupabaseSession } from '@/app/_hooks/useSupabaseSession';
import { format } from 'date-fns';
import Workout from './Workout';
import { WorkoutExercise } from '@/types/workout';

interface Props {
  value: Value;
};

const Workouts: React.FC<Props> = ({
  value
}) => {
  const [workouts, setWorkouts] = useState<WorkoutExercise[]>([]);
  const { token } = useSupabaseSession();
  
  useEffect(() => {
    if(!token || !value) return;

    const dateFormat = format(value, "yyyy-MM-dd");
    
    const fetcher = async () => {
      const response = await fetch(`/api/workouts?date=${dateFormat}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      
      const { workouts } = await response.json();

      setWorkouts(workouts);
    };

    fetcher();
  }, [value, token]);

  return (
    <div className="mt-8">
      {
        workouts.map((workout) => (
          <Workout 
            key={workout.workoutDetailId}
            exercise={workout.exercise}
            exerciseId={workout.exerciseId}
            muscleId={workout.muscleId} 
            rm={workout.rm}
            workoutDetailId={workout.workoutDetailId} 
          />
        ))
      }
    </div>
  );
};

export default Workouts;