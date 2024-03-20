// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";
import { prisma } from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  try {
    const weights = await prisma.bodyMeasurements.findMany({
      where: {
        userId: data.user!.id,
      },
      orderBy: {
        measuredAt: "asc"
      },
    });

    return NextResponse.json({ weights: weights }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export async function POST(request: NextRequest) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const body = await request.json();

  const { weight, bodyFatPercentage, date } = body;

  try {
    const weights = await prisma.bodyMeasurements.create({
      data: {
        userId: data.user!.id,
        weight: parseInt(weight),
        bodyFatPercentage: parseInt(bodyFatPercentage),
        measuredAt: new Date(date),
      },
    });

    return NextResponse.json({ weights: weights }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  }
};