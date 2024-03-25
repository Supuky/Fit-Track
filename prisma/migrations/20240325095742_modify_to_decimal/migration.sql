-- DropForeignKey
ALTER TABLE "setDetails" DROP CONSTRAINT "setDetails_workoutDetailId_fkey";

-- DropForeignKey
ALTER TABLE "workoutDetails" DROP CONSTRAINT "workoutDetails_workoutId_fkey";

-- DropIndex
DROP INDEX "exercises_name_key";

-- AlterTable
ALTER TABLE "bodyMeasurements" ADD COLUMN     "measuredAt" TIMESTAMP(3),
ALTER COLUMN "weight" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "bodyFatPercentage" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "setDetails" ALTER COLUMN "weight" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "workoutedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "workoutDetails" ADD CONSTRAINT "workoutDetails_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setDetails" ADD CONSTRAINT "setDetails_workoutDetailId_fkey" FOREIGN KEY ("workoutDetailId") REFERENCES "workoutDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE;
