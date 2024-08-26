/*
  Warnings:

  - You are about to drop the column `manageDocumentation` on the `Rank` table. All the data in the column will be lost.
  - You are about to drop the column `submitReports` on the `Rank` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rank" DROP COLUMN "manageDocumentation",
DROP COLUMN "submitReports",
ADD COLUMN     "isFlureLead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "manageLOA" BOOLEAN NOT NULL DEFAULT false;
