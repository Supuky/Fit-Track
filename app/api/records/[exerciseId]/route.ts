import { supabase } from "@/utils/supabaseClient";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  params: { params: { exerciseId: string } },
) {
  const token = request.headers.get("Authorization") ?? "";

  const { data, error } = await supabase.auth.getUser(token);

  if(error) throw new Error();

  const { params: { exerciseId } } = params;

  try {
    const allRecords = await prisma.workouts.findMany({
      where: {
        userId: data.user.id,
      },
      include: {
        workoutDetails: {
          where: {
            exerciseId: parseInt(exerciseId)
          },
          include: {
            setDetails: true
          },
        },
      },
    });

    // 各workoutDetails内のsetDetailsで(reps*weight / 40) + weightの値が最大となるものを取得
    const records: { 
      workoutDetailId: number | null,  
      maxSetDetailId: number | null,
      maxRm: number | null
    }[] = [];
    allRecords.forEach(record => {
      record.workoutDetails.forEach(workoutDetail => {
        let maxSetValue = 0;
        let maxSetDetail = null;

        workoutDetail.setDetails.forEach(setDetail => {
          const setValue = (setDetail.reps * setDetail.weight / 40) + setDetail.weight;
          if (setValue > maxSetValue) {
            maxSetValue = setValue;
            maxSetDetail = setDetail;
          };
        });

        records.push({ workoutDetailId: workoutDetail.id, maxSetDetailId: maxSetDetail!.id, maxRm: maxSetValue});
      });
    });

    return NextResponse.json({ records: records }, { status: 200 })
  } catch (error) {
    if(error instanceof Error) return NextResponse.json({ message: error.message }, { status: 400 });
  }
};