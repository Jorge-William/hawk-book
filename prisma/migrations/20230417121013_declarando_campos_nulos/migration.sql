-- AlterTable
ALTER TABLE `candidatos` MODIFY `data_nascimento` VARCHAR(191) NULL,
    MODIFY `nome_da_mae` VARCHAR(191) NULL,
    MODIFY `nome_do_pai` VARCHAR(191) NULL,
    MODIFY `cnh_categoria` VARCHAR(191) NULL,
    MODIFY `cnv_status` BOOLEAN NULL,
    MODIFY `telefone` VARCHAR(191) NULL,
    MODIFY `peso` INTEGER NULL,
    MODIFY `altura` INTEGER NULL,
    MODIFY `endereco` VARCHAR(191) NULL,
    MODIFY `bairro` VARCHAR(191) NULL,
    MODIFY `cep` VARCHAR(191) NULL,
    MODIFY `img_frente` VARCHAR(191) NULL,
    MODIFY `img_perfil` VARCHAR(191) NULL;
