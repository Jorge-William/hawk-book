/*
  Warnings:

  - You are about to drop the column `candidato_id` on the `curso_candidato` table. All the data in the column will be lost.
  - You are about to drop the column `curso_id` on the `curso_candidato` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidatoId,cursoId]` on the table `curso_candidato` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidatoId` to the `curso_candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cursoId` to the `curso_candidato` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `curso_candidato_candidato_id_curso_id_key` ON `curso_candidato`;

-- AlterTable
ALTER TABLE `curso_candidato` DROP COLUMN `candidato_id`,
    DROP COLUMN `curso_id`,
    ADD COLUMN `candidatoId` VARCHAR(191) NOT NULL,
    ADD COLUMN `cursoId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_CandidatoToCurso` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CandidatoToCurso_AB_unique`(`A`, `B`),
    INDEX `_CandidatoToCurso_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `curso_candidato_candidatoId_cursoId_key` ON `curso_candidato`(`candidatoId`, `cursoId`);
