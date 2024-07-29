/*
  Warnings:

  - Added the required column `aircraft` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `airport` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstOfficerId` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gate` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "aircraft" TEXT NOT NULL,
ADD COLUMN     "airport" TEXT NOT NULL,
ADD COLUMN     "firstOfficerId" INTEGER NOT NULL,
ADD COLUMN     "gate" TEXT NOT NULL,
ADD COLUMN     "groundOpsTLId" INTEGER,
ADD COLUMN     "inflightTLId" INTEGER,
ADD COLUMN     "sesTLId" INTEGER;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_firstOfficerId_fkey" FOREIGN KEY ("firstOfficerId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_inflightTLId_fkey" FOREIGN KEY ("inflightTLId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_groundOpsTLId_fkey" FOREIGN KEY ("groundOpsTLId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_sesTLId_fkey" FOREIGN KEY ("sesTLId") REFERENCES "Staff"("id") ON DELETE SET NULL ON UPDATE CASCADE;
