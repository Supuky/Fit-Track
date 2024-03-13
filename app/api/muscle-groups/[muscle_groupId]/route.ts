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
    const muscleGroups = await prisma.muscleGroups.findUnique({
      where: {
        id: parseInt(id),
      },
      select:{
        name: true,
      }
    });

    return NextResponse.json({ muscleGroups: muscleGroups }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};