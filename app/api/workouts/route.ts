// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";
import { prisma } from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  let date;
  if(dateParam) date = new Date(dateParam);

  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  try {
    // sqlクエリをで取得した方がいいかも
    // const workoutDays = await prisma.workouts.findMany({
    //   where: {
    //     userId: data.user!.id,
    //     workoutedAt: {
    //       gte: ,
    //       lt: ,
    //     }
    //   },
    // });

    const workouts = await prisma.$queryRaw`
      SELECT 
        "muscleGroups".id AS "muscleId",
        "muscleGroups".name AS muscle,
        exercises.id AS "exerciseId",
        exercises.name AS exercise,
        "setDetails"."workoutDetailId",
        MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS RM
      FROM 
        workouts
      INNER JOIN 
        "workoutDetails"
      ON
        workouts.id = "workoutDetails"."workoutId"
      INNER JOIN 
        "setDetails"
      ON
        "workoutDetails".id = "setDetails"."workoutDetailId"
      INNER JOIN  
        exercises
      ON 
        "workoutDetails"."exerciseId" = exercises.id
      INNER JOIN  
        "muscleGroups"
      ON 
        exercises."muscleGroupId" = "muscleGroups".id
      WHERE 
        workouts."userId" = ${data.user!.id}::uuid
        AND
        workouts."workoutedAt" = ${date}
      GROUP BY
        "setDetails"."workoutDetailId",
        exercises.id,
        exercises.name,
        "muscleGroups".id,
        "muscleGroups".name
    ;`;

    return NextResponse.json({ workouts: workouts }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function POST(request: NextRequest) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const body = await request.json();

  const { exerciseId, memo, workouts, date } = body;

  const dateFormat = new Date(date);

  const setNumber = workouts.length;

  try {
    const workout = await prisma.workouts.create({
      data: {
        userId: data.user!.id,
        workoutedAt: dateFormat
      }
    });

    const workoutDetail = await prisma.workoutDetails.create({
      data: {
        workoutId: workout.id,
        exerciseId: parseInt(exerciseId),
        memo: memo
      }
    });

    let exerciseSets = [];
    for(let i = 0; i < setNumber; i++) {
      exerciseSets.push({workoutDetailId: workoutDetail!.id, setNumber: i+1, reps: parseInt(workouts[i].reps), weight: parseInt(workouts[i].weights) });
    };

    const setDetails = await prisma.setDetails.createMany({
      data: [
        ...exerciseSets,
      ],
    });

    return NextResponse.json({ workout, workoutDetail, setDetails }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};