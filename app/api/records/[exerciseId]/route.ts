// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "@/utils/supabaseGetUser";
import { prisma } from "@/lib/prisma";

// const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  params: { params: { exerciseId: string } }
) {
  const { data, error } = await getUserData(request);
  const { searchParams } = new URL(request.url);
  const index = parseInt(searchParams.get("tabIndex")!);

  if (error) throw new Error();

  const {
    params: { exerciseId },
  } = params;

  try {
    let sqlRecords;
    // 冗長な書き方
    if (index === 0) {
      sqlRecords = await prisma.$queryRaw`
      SELECT 
        "setDetails"."workoutDetailId",
        workouts."workoutedAt",
        "exercises".name,
        MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS "RM"
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
      INNER JOIN
        "exercises"
      ON
        "workoutDetails"."exerciseId" = "exercises".id
      WHERE
        workouts."userId" = ${data.user!.id}::uuid
        AND
        "workoutDetails"."exerciseId" = ${parseInt(exerciseId)}
        AND
        workouts."workoutedAt" >= (CURRENT_DATE - INTERVAL '1 month')
      GROUP BY
        "setDetails"."workoutDetailId",
        "workoutDetails"."exerciseId",
        workouts."workoutedAt",
        "exercises".name
      ORDER BY
        workouts."workoutedAt" ASC
    ;`;
    } else if (index === 1) {
      sqlRecords = await prisma.$queryRaw`
      SELECT 
        "setDetails"."workoutDetailId",
        workouts."workoutedAt",
        "exercises".name,
        MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS "RM"
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
      INNER JOIN
        "exercises"
      ON
        "workoutDetails"."exerciseId" = "exercises".id
      WHERE
        workouts."userId" = ${data.user!.id}::uuid
        AND
        "workoutDetails"."exerciseId" = ${parseInt(exerciseId)}
        AND
        workouts."workoutedAt" >= (CURRENT_DATE - INTERVAL '6 months')
      GROUP BY
        "setDetails"."workoutDetailId",
        "workoutDetails"."exerciseId",
        workouts."workoutedAt",
        "exercises".name
      ORDER BY
        workouts."workoutedAt" ASC
    ;`;
    } else if (index === 2) {
      sqlRecords = await prisma.$queryRaw`
      SELECT 
        "setDetails"."workoutDetailId",
        workouts."workoutedAt",
        "exercises".name,
        MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS "RM"
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
      INNER JOIN
        "exercises"
      ON
        "workoutDetails"."exerciseId" = "exercises".id
      WHERE
        workouts."userId" = ${data.user!.id}::uuid
        AND
        "workoutDetails"."exerciseId" = ${parseInt(exerciseId)}
        AND
        workouts."workoutedAt" >= (CURRENT_DATE - INTERVAL '1 year')
      GROUP BY
        "setDetails"."workoutDetailId",
        "workoutDetails"."exerciseId",
        workouts."workoutedAt",
        "exercises".name
      ORDER BY
        workouts."workoutedAt" ASC
    ;`;
    } else {
      sqlRecords = await prisma.$queryRaw`
      SELECT 
        "setDetails"."workoutDetailId",
        workouts."workoutedAt",
        "exercises".name,
        MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS "RM"
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
      INNER JOIN
        "exercises"
      ON
        "workoutDetails"."exerciseId" = "exercises".id
      WHERE
        workouts."userId" = ${data.user!.id}::uuid
        AND
        "workoutDetails"."exerciseId" = ${parseInt(exerciseId)}
      GROUP BY
        "setDetails"."workoutDetailId",
        "workoutDetails"."exerciseId",
        workouts."workoutedAt",
        "exercises".name
      ORDER BY
        workouts."workoutedAt" ASC
    ;`;
    }

    // const sqlRecords = await prisma.$queryRaw`
    //   SELECT
    //     "setDetails"."workoutDetailId",
    //     workouts."workoutedAt",
    //     "exercises".name,
    //     MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS "RM"
    //   FROM
    //     workouts
    //   INNER JOIN
    //     "workoutDetails"
    //   ON
    //     workouts.id = "workoutDetails"."workoutId"
    //   INNER JOIN
    //     "setDetails"
    //   ON
    //     "workoutDetails".id = "setDetails"."workoutDetailId"
    //   INNER JOIN
    //     "exercises"
    //   ON
    //     "workoutDetails"."exerciseId" = "exercises".id
    //   WHERE
    //     workouts."userId" = ${data.user!.id}::uuid
    //     AND
    //     "workoutDetails"."exerciseId" = ${parseInt(exerciseId)}
    //     AND
    //     workouts."workoutedAt" >= (CURRENT_DATE - INTERVAL '1 month')
    //   GROUP BY
    //     "setDetails"."workoutDetailId",
    //     "workoutDetails"."exerciseId",
    //     workouts."workoutedAt",
    //     "exercises".name
    //   ORDER BY
    //     workouts."workoutedAt" ASC
    // ;`;

    return NextResponse.json({ records: sqlRecords }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

// うまくいかないクエリ↓
// const { searchParams } = new URL(request.url);
//   const index = parseInt(searchParams.get('tabIndex')!);

//   let dateCondition = '';
//   if (index === 0) {
//     dateCondition = '- INTERVAL \'1 month\'';
//   } else if (index === 1) {
//     dateCondition = '- INTERVAL \'6 months\'';
//   } else if (index === 2) {
//     dateCondition = '- INTERVAL \'1 year\'';

// const sqlRecords = await prisma.$queryRaw`
//       SELECT 
//         "setDetails"."workoutDetailId",
//         workouts."workoutedAt",
//         "exercises".name,
//         MAX("setDetails".reps * "setDetails".weight / 40 + "setDetails".weight) AS "RM"
//       FROM
//         workouts
//       INNER JOIN
//         "workoutDetails"
//       ON
//         workouts.id = "workoutDetails"."workoutId"
//       INNER JOIN
//         "setDetails"
//       ON
//         "workoutDetails".id = "setDetails"."workoutDetailId"
//       INNER JOIN
//         "exercises"
//       ON
//         "workoutDetails"."exerciseId" = "exercises".id
//       WHERE
//         workouts."userId" = ${data.user!.id}::uuid
//         AND
//         "workoutDetails"."exerciseId" = ${parseInt(exerciseId)}
//         AND
//         workouts."workoutedAt" >= ${dateCondition}
//       GROUP BY
//         "setDetails"."workoutDetailId",
//         "workoutDetails"."exerciseId",
//         workouts."workoutedAt",
//         "exercises".name
//       ORDER BY
//         workouts."workoutedAt" ASC