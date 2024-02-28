import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  params: { params: { workoutId: string, exerciseId: string } },
) {
  const { data, error } = await getUserData(request);

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
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { workoutId, exerciseId } } = params;

  const body = await request.json();

  const { memo, setNumber, reps, weight } = body;
  
  async function transfer() {
    return prisma.$transaction(async () => {
      const workoutDetail = await prisma.workoutDetails.findFirst({
        where: {
          workoutId: parseInt(workoutId),
          exerciseId: parseInt(exerciseId),
        },
      });

      if(!workoutDetail) throw new Error("更新できませんでした");
  
      const workoutDetailUpdate = await prisma.workoutDetails.update({
        where: {
          id: workoutDetail.id
        },
        data: {
          memo: memo
        },
      });
  
      await prisma.setDetails.deleteMany({
        where: {
          workoutDetailId: workoutDetail.id
        },
      });
  
      let exerciseSets = [];
      for(let i = 0; i < setNumber; i++) {
        exerciseSets.push({workoutDetailId: workoutDetail.id, setNumber: i+1, reps: parseInt(reps[i]), weight: parseInt(weight[i]) });
      };
  
      const setDetails = await prisma.setDetails.createMany({
        data: [
          ...exerciseSets,
        ],
      });

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
  params: { params: { workoutId: string, exerciseId: string } },
) {
  const { data, error } = await getUserData(request);

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