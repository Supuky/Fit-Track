import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  params: { params: { exerciseId: string } },
) {
  const { data, error } = await getUserData(request);

  if(error) throw new Error();

  const { params: { exerciseId } } = params;

  try {
    const sqlRecords = await prisma.$queryRaw`
      SELECT 
        "setDetails"."workoutDetailId",
        MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS RM
      FROM
        workouts
      INNER JOIN
        "workoutDetails"
      ON
        workouts.id = "workoutDetails"."workoutId"
      INNER JOIN
        "setDetails"
      ON
        "workoutDetails".id = "setDetails"."workoutDetailId"
      WHERE
        workouts."userId" = ${data.user!.id}::uuid
      GROUP BY
        "setDetails"."workoutDetailId"
    ;`;

    return NextResponse.json({ records: sqlRecords }, { status: 200 })
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  }
};