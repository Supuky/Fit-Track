import { supabase } from "@/utils/supabaseClient";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") ?? "";

  const { data, error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  try {
    const weights = await prisma.bodyMeasurements.findMany({
      where: {
        userId: data.user.id,
      },
    });

    return NextResponse.json({ weights: weights }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization") ?? "";

  const { data, error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const body = await request.json();

  const { weight, bodyFatPercentage } = body;

  try {
    const weights = await prisma.bodyMeasurements.create({
      data: {
        userId: data.user.id,
        weight: weight,
        bodyFatPercentage: bodyFatPercentage
      },
    });

    return NextResponse.json({ weights: weights }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  }
};