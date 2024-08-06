/*
  Warnings:

  - You are about to drop the column `staffId` on the `Session` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_staffId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "staffId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Staff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
