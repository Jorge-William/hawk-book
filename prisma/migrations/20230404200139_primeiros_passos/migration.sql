-- CreateTable
CREATE TABLE `candidatos` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cpf_num` INTEGER NOT NULL,
    `data_nascimento` DATETIME(3) NOT NULL,
    `nome_da_mae` VARCHAR(191) NOT NULL,
    `nome_do_pai` VARCHAR(191) NOT NULL,
    `cnh_categoria` VARCHAR(191) NOT NULL,
    `cnv_status` BOOLEAN NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `peso` INTEGER NOT NULL,
    `altura` INTEGER NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cep` INTEGER NOT NULL,

    UNIQUE INDEX `candidatos_cpf_num_key`(`cpf_num`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` VARCHAR(191) NOT NULL,
    `nome_curso` VARCHAR(191) NOT NULL,
    `descricao_curso` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `cursos_nome_curso_key`(`nome_curso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `curso_candidato` (
    `id` VARCHAR(191) NOT NULL,
    `candidatoId` VARCHAR(191) NOT NULL,
    `cursoId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `curso_candidato_candidatoId_cursoId_key`(`candidatoId`, `cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
