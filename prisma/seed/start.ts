import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { muscleGroups } from "./muscleGroups";
import { exercises } from "./exercises"; 

async function main() {
  await prisma.muscleGroups.deleteMany();
  await prisma.exercises.deleteMany();
  await muscleGroups();
  await exercises();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
});