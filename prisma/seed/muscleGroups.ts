import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const muscleGroups = async () => {
  await prisma.muscleGroups.createMany({
    data: [
      {id: 1, name: "胸"},
      {id: 2, name: "背中"},
      {id: 3, name: "腕"},
      {id: 4, name: "肩"},
      {id: 5, name: "腹"},
      {id: 6, name: "脚"},
      {id: 7, name: "その他"},
    ],
  });
};