import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"; 
import { getUserData } from "@/utils/supabaseGetUser";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { muscle_groupId: string } }
) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const id = params.muscle_groupId;
  
  try {
    const exercises = await prisma.exercises.findMany({
      where: {
        muscleGroupId: parseInt(id),
        userId: data.user!.id,
      },
      select: {
        id: true,
        muscleGroupId: true,
        name: true,
      }
    });

    return NextResponse.json({ exercises: exercises }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};

export async function POST(
  request: NextRequest,
  { params }: { params: { muscle_groupId: string } },
) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const id = params.muscle_groupId;

  const body = await request.json();
  const { name } = body;

  try {
    const exercises = await prisma.exercises.create({
      data: {
        userId: data.user!.id,
        muscleGroupId: parseInt(id),
        name: name
      }
    });
    
    return NextResponse.json({ exercises: exercises }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};