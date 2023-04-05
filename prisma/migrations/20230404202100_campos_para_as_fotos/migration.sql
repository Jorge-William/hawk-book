/*
  Warnings:

  - Added the required column `img_frente` to the `candidatos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img_perfil` to the `candidatos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `candidatos` ADD COLUMN `img_frente` VARCHAR(191) NOT NULL,
    ADD COLUMN `img_perfil` VARCHAR(191) NOT NULL;
