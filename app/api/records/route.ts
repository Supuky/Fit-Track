// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";
import { prisma } from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  try {
    const muscleGroups = await prisma.muscleGroups.findMany({
      select: {
        name: true,
      }
    });

    const exercises = await prisma.exercises.findMany({
      where: {
        userId: data.user!.id,
      },
      select: {
        id: true,
        name: true,
        muscleGroups: {
          select: {
            name: true
          }
        },
      },
    });

    // 部位と種目が紐づけられる形に変更
    // const groupedExercises = muscleGroups.map(group => {
    //   const groupExercises = exercises
    //     .filter(exercise => exercise.muscleGroupId === group.id)
    //     .map(exercise => exercise.name);
    //     return {
    //       [group.name]: groupExercises
    //     };
    // });

    // const groupedExercises = muscleGroups.reduce((acc, group) => {
    //   const groupExercises = exercises
    //     .filter(exercise => exercise.muscleGroupId === group.id)
    //     .map(exercise => exercise.name);
    //   return {
    //     ...acc,
    //     [group.name]: groupExercises
    //   };
    // }, {});

    // return NextResponse.json({ groupedExercises: groupedExercises }, { status: 200 });
    return NextResponse.json({ muscleGroups, exercises }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};