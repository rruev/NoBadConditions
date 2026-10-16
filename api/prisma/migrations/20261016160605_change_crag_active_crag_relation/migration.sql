/*
  Warnings:

  - A unique constraint covering the columns `[cragId]` on the table `active_crags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `active_crags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "active_crags" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "active_crags_cragId_key" ON "active_crags"("cragId");

-- AddForeignKey
ALTER TABLE "active_crags" ADD CONSTRAINT "active_crags_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
