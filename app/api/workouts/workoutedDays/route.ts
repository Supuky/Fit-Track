import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const yearParam = searchParams.get('year');
  const monthParam = searchParams.get('month');
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  try {
    const workoutDays = await prisma.workouts.findMany({
      where: {
        userId: data.user!.id,
        workoutedAt: {
          gte: new Date(parseInt(yearParam!), parseInt(monthParam!), 1),
          lt: new Date(parseInt(yearParam!), parseInt(monthParam!) % 12 + 1, 0),
        }
      },
      select: {
        workoutedAt: true
      }
    });

    return NextResponse.json({ workoutDays: workoutDays }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};
