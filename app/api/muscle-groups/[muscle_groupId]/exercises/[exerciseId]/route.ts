import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  params: { params: { muscle_groupId: string, exerciseId: string} }  
) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { muscle_groupId, exerciseId } } = params;

  try {
    const exercise = await prisma.exercises.findUnique({
      where: {
        id: parseInt(exerciseId),
        userId: data.user!.id,
        muscleGroupId: parseInt(muscle_groupId),
      },
    });

    if(exercise === undefined) return NextResponse.json({ message: "見つかりませんでした" }, { status: 404 });;

    return NextResponse.json({ exercise: exercise }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function PUT(
  request: NextRequest,
  params: { params: { muscle_groupId: string, exerciseId: string } }
  ) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { muscle_groupId, exerciseId } } = params;

  const body = await request.json();
  const { name } = body;

  try {
    const exercise = await prisma.exercises.update({
      where: {
        id: parseInt(exerciseId),
        userId: data.user!.id,
        muscleGroupId: parseInt(muscle_groupId),
      },
      data: {
        name: name,
      },
    });
    
    return NextResponse.json({ exercise: exercise }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function DELETE(
  request: NextRequest,
  params: { params: { muscle_groupId: string, exerciseId: string } }
  ) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { muscle_groupId, exerciseId } } = params;

  try {
    const exercise = await prisma.exercises.delete({
      where: {
        id: parseInt(exerciseId),
        userId: data.user!.id,
        muscleGroupId: parseInt(muscle_groupId),
      }
    });
    
    return NextResponse.json({ exercise: exercise }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};