-- CreateEnum
CREATE TYPE "TASK_FIELDS" AS ENUM ('createdAt', 'updatedAt', 'title', 'priority');

-- DropForeignKey
ALTER TABLE "TaskUser" DROP CONSTRAINT "TaskUser_task_id_fkey";

-- DropEnum
DROP TYPE "FIELDS_TASK";

-- AddForeignKey
ALTER TABLE "TaskUser" ADD CONSTRAINT "TaskUser_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
