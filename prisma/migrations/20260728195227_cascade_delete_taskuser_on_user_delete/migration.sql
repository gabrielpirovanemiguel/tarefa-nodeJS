-- DropForeignKey
ALTER TABLE "TaskUser" DROP CONSTRAINT "TaskUser_user_id_fkey";

-- AddForeignKey
ALTER TABLE "TaskUser" ADD CONSTRAINT "TaskUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
