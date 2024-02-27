import { supabase } from "@/utils/supabaseClient";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  params: { params: { workoutId: string, exerciseId: string } },
) {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const { params: { workoutId, exerciseId } } = params;

  try {
    const workoutDetails = await prisma.workoutDetails.findFirst({
      where: {
        workoutId: parseInt(workoutId),
        exerciseId: parseInt(exerciseId),
      },
      include: {
        setDetails: true
      },
    });

    return NextResponse.json({ workoutDetails: workoutDetails }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function PUT(
  request: NextRequest,
  params: { params: { workoutId: string, exerciseId: string } },
) {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const { params: { workoutId, exerciseId } } = params;

  const body = await request.json();

  const { memo, setNumber, reps, weight } = body;
  
  try {
    const workoutDetail = await prisma.workoutDetails.findFirst({
      where: {
        workoutId: parseInt(workoutId),
        exerciseId: parseInt(exerciseId),
      },
    });

    const workoutDetailUpdate = await prisma.workoutDetails.update({
      where: {
        id: workoutDetail!.id
      },
      data: {
        memo: memo
      },
    });

    await prisma.setDetails.deleteMany({
      where: {
        workoutDetailId: workoutDetail!.id
      },
    });

    let setDetails = [];
    for(let i = 0; i < setNumber; i++) {
      const setDetail = await prisma.setDetails.create({
        data: {
          workoutDetailId: workoutDetail!.id,
          setNumber: i + 1,
          reps: reps[i],
          weight: weight[i]
        },
      });
      setDetails.push(setDetail);
    }


    return NextResponse.json({ workoutDetail: workoutDetail, setDetails: setDetails }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function DELETE(
  request: NextRequest,
  params: { params: { workoutId: string, exerciseId: string } },
) {
  const token = request.headers.get("Authorization") ?? "";

  const { error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const { params: { workoutId } } = params;
  
  try {

    await prisma.workouts.delete({
      where: {
        id: parseInt(workoutId)
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};