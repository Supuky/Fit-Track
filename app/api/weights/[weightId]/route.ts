import { supabase } from "@/utils/supabaseClient";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  params: { params: { weightId: string } }
) {
  const token = request.headers.get("Authorization") ?? "";

  const { data, error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const { params: { weightId } } = params;

  const body = await request.json();

  const { weight, bodyFatPercentage } = body;

  try {
    const weights = await prisma.bodyMeasurements.update({
      where: {
        id: parseInt(weightId),
        userId: data.user.id,
      },
      data: {
        weight: weight,
        bodyFatPercentage: bodyFatPercentage,
      },
    });

    return NextResponse.json({ weights: weights }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  }
};

export async function DELETE(
  request: NextRequest, 
  params: { params: { weightId: string } }
) {
  const token = request.headers.get("Authorization") ?? "";

  const { data, error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const { params: { weightId } } = params;

  try {
    const weights = await prisma.bodyMeasurements.delete({
      where: {
        id: parseInt(weightId),
        userId: data.user.id,
      }
    });

    return NextResponse.json({ weights: weights }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  };
};