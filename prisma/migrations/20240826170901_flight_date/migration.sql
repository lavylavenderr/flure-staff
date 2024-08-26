/*
  Warnings:

  - Added the required column `dateTime` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;
