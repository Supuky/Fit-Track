import React from 'react';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { WorkoutExercise } from '@/types/workout';

interface Props {
  workout: WorkoutExercise;
}

const Workout: React.FC<Props> = ({
  workout
}) => {
  return (
    <Link
      href={`/dashboard/muscle-groups/${workout.muscleId}/exercise/${workout.exerciseId}/${workout.workoutDetailId}`}
      className="flex justify-between items-center px-8 py-4 mt-4 rounded-xl shadow-xl max-w-[600px] m-auto bg-base-white
      text-base-black"
    >
      <Dumbbell className="text-primary"/>
      <p>{workout.exercise}</p>
      <p>{workout.rm}RM</p>
    </Link>
  )
}

export default Workout;