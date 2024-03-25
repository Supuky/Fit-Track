/*
  Warnings:

  - You are about to alter the column `weight` on the `bodyMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `bodyFatPercentage` on the `bodyMeasurements` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "bodyMeasurements" ALTER COLUMN "weight" SET DATA TYPE INTEGER,
ALTER COLUMN "bodyFatPercentage" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "height" SET DATA TYPE DECIMAL(65,30);
