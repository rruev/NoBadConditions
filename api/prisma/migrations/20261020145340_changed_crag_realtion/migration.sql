-- DropForeignKey
ALTER TABLE "active_crags" DROP CONSTRAINT "active_crags_cragId_fkey";

-- AddForeignKey
ALTER TABLE "active_crags" ADD CONSTRAINT "active_crags_cragId_fkey" FOREIGN KEY ("cragId") REFERENCES "crags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
