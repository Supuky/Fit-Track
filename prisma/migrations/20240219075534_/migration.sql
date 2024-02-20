/*
  Warnings:

  - You are about to drop the `MuscleGruops` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Exercises` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Exercises" DROP CONSTRAINT "Exercises_muscleGroupId_fkey";

-- DropTable
DROP TABLE "MuscleGruops";

-- CreateTable
CREATE TABLE "MuscleGroups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MuscleGroups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroups_name_key" ON "MuscleGroups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Exercises_name_key" ON "Exercises"("name");

-- AddForeignKey
ALTER TABLE "Exercises" ADD CONSTRAINT "Exercises_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
