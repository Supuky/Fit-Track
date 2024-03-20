// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";
import { prisma } from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  params: { params: { workoutDetailId: string, exerciseId: string } },
) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { workoutDetailId, exerciseId } } = params;

  try {
    const workoutDetails = await prisma.workoutDetails.findFirst({
      where: {
        id: parseInt(workoutDetailId),
        exerciseId: parseInt(exerciseId),
      },
      include: {
        setDetails: {
          select: {
            reps: true,
            weight: true,
          }
        },
      },
    });

    return NextResponse.json({ workoutDetails: workoutDetails }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function PUT(
  request: NextRequest,
  params: { params: { workoutDetailId: string, exerciseId: string } },
) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { workoutDetailId, exerciseId } } = params;

  
  const body = await request.json();
  
  const { memo, workouts } = body;

  const setNumber = workouts.length;
  
  async function transfer() {
    return prisma.$transaction(async () => {
      const workoutDetail = await prisma.workoutDetails.findFirst({
        where: {
          id: parseInt(workoutDetailId),
          exerciseId: parseInt(exerciseId),
        },
      });

      console.log(workoutDetail);

      if(!workoutDetail) throw new Error("更新できませんでした");
  
      const workoutDetailUpdate = await prisma.workoutDetails.update({
        where: {
          id: workoutDetail.id
        },
        data: {
          memo: memo
        },
      });

      console.log(workoutDetailUpdate);
  
      await prisma.setDetails.deleteMany({
        where: {
          workoutDetailId: workoutDetail.id
        },
      });
  
      let exerciseSets = [];
      for(let i = 0; i < setNumber; i++) {
        exerciseSets.push({workoutDetailId: workoutDetail.id, setNumber: i+1, reps: parseInt(workouts[i].reps), weight: parseInt(workouts[i].weight) });
      };

      console.log(exerciseSets);
  
      const setDetails = await prisma.setDetails.createMany({
        data: [
          ...exerciseSets,
        ],
      });

      console.log(setDetails);

      return { workoutDetail, setDetails };
    },
    {
     maxWait: 5000,
     timeout: 10000, 
    }
    );
  };

  try {
    const { workoutDetail, setDetails } =  await transfer();

    return NextResponse.json({ workoutDetail: workoutDetail, setDetails: setDetails }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function DELETE(
  request: NextRequest,
  params: { params: { workoutDetailId: string, exerciseId: string } },
) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { workoutDetailId } } = params;
  
  try {
    const workoutDetails = await prisma.workoutDetails.findUnique({
      where: {
        id: parseInt(workoutDetailId)
      },
      select: {
        workoutId: true,
      },
    });

    if(workoutDetails === null) throw new Error();
    const { workoutId } = workoutDetails;

    await prisma.workouts.delete({
      where: {
        id: workoutId
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};