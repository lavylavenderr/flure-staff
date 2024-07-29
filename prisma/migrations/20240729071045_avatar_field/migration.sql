/*
  Warnings:

  - Added the required column `avatar` to the `Staff` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "avatar" TEXT NOT NULL;
