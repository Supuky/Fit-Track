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
      text-base-black/90"
    >
      <div>
        <Dumbbell size={30} className="text-primary rotate-[135deg]"/>
        <p className="font-bold">{workout.exercise}</p>
      </div>
      <p className="text-base-middle">1RM: {workout.rm}kg</p>
    </Link>
  )
}

export default Workout;