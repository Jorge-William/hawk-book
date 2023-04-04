/*
  Warnings:

  - You are about to drop the column `candidatoId` on the `curso_candidato` table. All the data in the column will be lost.
  - You are about to drop the column `cursoId` on the `curso_candidato` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[candidato_id,curso_id]` on the table `curso_candidato` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `candidato_id` to the `curso_candidato` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curso_id` to the `curso_candidato` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `curso_candidato_candidatoId_cursoId_key` ON `curso_candidato`;

-- AlterTable
ALTER TABLE `curso_candidato` DROP COLUMN `candidatoId`,
    DROP COLUMN `cursoId`,
    ADD COLUMN `candidato_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `curso_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `curso_candidato_candidato_id_curso_id_key` ON `curso_candidato`(`candidato_id`, `curso_id`);
