import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { muscleGroups } from "./muscleGroups";

async function main() {
  await prisma.muscleGroups.deleteMany();
  await muscleGroups();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
});