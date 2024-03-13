import React from 'react';
import { Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { WorkoutExercise } from '@/types/workout';

const Workout: React.FC<WorkoutExercise> = ({
  exercise,
  exerciseId,
  muscleId,
  rm,
  workoutDetailId
}) => {
  return (
    <Link
      href={`/dashboard/muscle-groups/${muscleId}/exercise/${exerciseId}/${workoutDetailId}`}
      className="flex justify-between items-center px-8 py-4 mt-4 rounded-xl shadow-xl max-w-[600px] m-auto bg-base-white
      text-base-black"
    >
      <Dumbbell className="text-primary"/>
      <p>{exercise}</p>
      <p>{rm}RM</p>
    </Link>
  )
}

export default Workout;