/*
  Warnings:

  - A unique constraint covering the columns `[handicap,courseId]` on the table `Hole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `par` to the `Hole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hole" ADD COLUMN     "par" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hole_handicap_courseId_key" ON "Hole"("handicap", "courseId");
