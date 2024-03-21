/*
  Warnings:

  - You are about to drop the column `icon` on the `app_master_icon` table. All the data in the column will be lost.
  - Added the required column `icon_url` to the `app_master_icon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app_master_icon" DROP COLUMN "icon",
ADD COLUMN     "icon_url" TEXT NOT NULL;
