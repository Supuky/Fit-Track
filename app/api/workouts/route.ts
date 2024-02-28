import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  try {
    const workouts = await prisma.workouts.findMany({
      where: {
        userId: data.user!.id,
      },
      include: { 
        workoutDetails: {
          include: {
            setDetails: true
          },
        },
      },
    });
    
    return NextResponse.json({ workouts: workouts }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function POST(request: NextRequest) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const body = await request.json();

  const { exerciseId, memo, setNumber, reps, weight } = body;

  try {
    const workout = await prisma.workouts.create({
      data: {
        userId: data.user!.id
      }
    });

    const workoutDetail = await prisma.workoutDetails.create({
      data: {
        workoutId: workout.id,
        exerciseId: exerciseId,
        memo: memo
      }
    });

    let exerciseSets = [];
    for(let i = 0; i < setNumber; i++) {
      exerciseSets.push({workoutDetailId: workoutDetail!.id, setNumber: i+1, reps: parseInt(reps[i]), weight: parseInt(weight[i]) });
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