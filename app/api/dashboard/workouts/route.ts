import { supabase } from "@/utils/supabaseClient";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") ?? "";

  const { data, error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  try {
    const workouts = await prisma.workouts.findMany({
      where: {
        userId: data.user.id,
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

// exerciseId: 2, memo: "3セット", setNumber: 3, reps: [10, 10, 8], weight: [20, 20, 20]

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") ?? "";

  const { data, error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const body = await request.json();

  const { exerciseId, memo, setNumber, reps, weight } = body;

  try {
    const workout = await prisma.workouts.create({
      data: {
        userId: data.user.id
      }
    });

    const workoutDetail = await prisma.workoutDetails.create({
      data: {
        workoutId: workout.id,
        exerciseId: exerciseId,
        memo: memo
      }
    });

    let setDetails = [];
    for(let i = 0; i < setNumber; i++) {
      const setDetail = await prisma.setDetails.create({
        data: {
          workoutDetailId: workoutDetail.id,
          setNumber: i + 1,
          reps: reps[i],
          weight: weight[i]
        },
      });
      setDetails.push(setDetail);
    }

    return NextResponse.json({ workout, workoutDetail, setDetails }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};