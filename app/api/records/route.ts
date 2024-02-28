import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  try {
    const muscleGroups = await prisma.muscleGroups.findMany();

    const exercises = await prisma.exercises.findMany({
      where: {
        userId: data.user!.id,
      },
      include: {
        muscleGroups: true,
      },
    });

    // 部位と種目が紐づけられる形に変更
    const groupedExercises = muscleGroups.map(group => {
      const groupExercises = exercises
        .filter(exercise => exercise.muscleGroupId === group.id)
        .map(exercise => exercise.name);
        return {
          [group.name]: groupExercises
        };
    });

    return NextResponse.json({ groupedExercises: groupedExercises }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};