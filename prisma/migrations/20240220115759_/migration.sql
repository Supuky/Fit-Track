/*
  Warnings:

  - You are about to drop the `BodyMeasurements` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contacts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exercises` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MuscleGroups` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SetDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutDetails` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workouts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BodyMeasurements" DROP CONSTRAINT "BodyMeasurements_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exercises" DROP CONSTRAINT "Exercises_muscleGroupId_fkey";

-- DropForeignKey
ALTER TABLE "Exercises" DROP CONSTRAINT "Exercises_userId_fkey";

-- DropForeignKey
ALTER TABLE "SetDetails" DROP CONSTRAINT "SetDetails_workoutDetailId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutDetails" DROP CONSTRAINT "WorkoutDetails_exerciseId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutDetails" DROP CONSTRAINT "WorkoutDetails_workoutId_fkey";

-- DropForeignKey
ALTER TABLE "Workouts" DROP CONSTRAINT "Workouts_userId_fkey";

-- DropTable
DROP TABLE "BodyMeasurements";

-- DropTable
DROP TABLE "Contacts";

-- DropTable
DROP TABLE "Exercises";

-- DropTable
DROP TABLE "MuscleGroups";

-- DropTable
DROP TABLE "SetDetails";

-- DropTable
DROP TABLE "WorkoutDetails";

-- DropTable
DROP TABLE "Workouts";

-- CreateTable
CREATE TABLE "bodyMeasurements" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "weight" INTEGER NOT NULL,
    "bodyFatPercentage" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bodyMeasurements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workoutDetails" (
    "id" SERIAL NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "memo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workoutDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setDetails" (
    "id" SERIAL NOT NULL,
    "workoutDetailId" INTEGER NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muscleGroups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "muscleGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "userId" UUID,
    "muscleGroupId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "muscleGroups_name_key" ON "muscleGroups"("name");

-- CreateIndex
CREATE UNIQUE INDEX "exercises_name_key" ON "exercises"("name");

-- AddForeignKey
ALTER TABLE "bodyMeasurements" ADD CONSTRAINT "bodyMeasurements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutDetails" ADD CONSTRAINT "workoutDetails_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workoutDetails" ADD CONSTRAINT "workoutDetails_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setDetails" ADD CONSTRAINT "setDetails_workoutDetailId_fkey" FOREIGN KEY ("workoutDetailId") REFERENCES "workoutDetails"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "muscleGroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_userId_fkey" FOREIGN KEY ("userId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
