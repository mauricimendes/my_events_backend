/*
  Warnings:

  - You are about to drop the column `intial_date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the `UsersEvents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `initial_date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersEvents" DROP CONSTRAINT "UsersEvents_event_id_fkey";

-- DropForeignKey
ALTER TABLE "UsersEvents" DROP CONSTRAINT "UsersEvents_user_id_fkey";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "intial_date",
ADD COLUMN     "initial_date" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "UsersEvents";

-- CreateTable
CREATE TABLE "users_events" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_events_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_events" ADD CONSTRAINT "users_events_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_events" ADD CONSTRAINT "users_events_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
