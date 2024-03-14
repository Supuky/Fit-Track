// ダッシュボードの記録一覧（下部分）
export type WorkoutExercise = { 
  exercise: string,
  exerciseId: number,
  muscleId: number,
  workoutDetailId: number,
  rm: number, 
};

export type MuscleGroup = {
  id: number,
  name: string,
};

export type Exercise = {
  id: number,
  muscleGroupId: number,
  name: string,
  muscleGroups: MuscleGroup
};

export type SetDetail = {
  reps: number,
  weight: number
};

export type Record = {
  workoutDetailId: number,
  workoutedAt: string,
  name: string,
  rm: number,
};

export type WeightType = {
  id: number,
  weight: number,
  measuredAt: string,
};

export type WorkoutData = {
  exerciseId: string | string[];
  workouts: {
    weights: string;
    reps: string;
  }[];
  memo: string;
  date: string | null;
};

export type WorkoutUpdateData = {
  exerciseId: string | string[];
  workouts: {
    weight: string;
    reps: string;
  }[];
  memo: string;
};