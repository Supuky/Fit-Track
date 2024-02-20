import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const muscleGroups = async () => {
  await prisma.muscleGroups.createMany({
    data: [
      {name: "胸"},
      {name: "背中"},
      {name: "腕"},
      {name: "肩"},
      {name: "腹"},
      {name: "脚"},
      {name: "その他"},
    ],
  });
};