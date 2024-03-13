import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server"; 

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const muscleGroups = await prisma.muscleGroups.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({ muscleGroups: muscleGroups }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};