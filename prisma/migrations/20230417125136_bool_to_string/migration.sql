/*
  Warnings:

  - You are about to alter the column `cnv_status` on the `candidatos` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `candidatos` MODIFY `cnv_status` VARCHAR(191) NULL;
