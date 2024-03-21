/*
  Warnings:

  - You are about to drop the column `master_category_id` on the `master_category` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `master_data` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `app_category_modul` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `app_category_modul` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "master_category" DROP CONSTRAINT "master_category_master_category_id_fkey";

-- AlterTable
ALTER TABLE "app_category_modul" ADD COLUMN     "code" VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE "master_category" DROP COLUMN "master_category_id",
ADD COLUMN     "master_category_parent_id" INTEGER;

-- AlterTable
ALTER TABLE "master_data" DROP COLUMN "order";

-- CreateIndex
CREATE UNIQUE INDEX "app_category_modul_code_key" ON "app_category_modul"("code");

-- AddForeignKey
ALTER TABLE "master_category" ADD CONSTRAINT "master_category_master_category_parent_id_fkey" FOREIGN KEY ("master_category_parent_id") REFERENCES "master_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
