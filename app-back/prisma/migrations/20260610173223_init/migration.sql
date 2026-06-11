-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` CHAR(20) NOT NULL,
    `apellido` CHAR(20) NOT NULL,
    `email` CHAR(50) NOT NULL,
    `password` CHAR(50) NOT NULL,
    `id_direccion` INTEGER NOT NULL,

    UNIQUE INDEX `Usuario_id_direccion_key`(`id_direccion`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Direccion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `calle` CHAR(50) NOT NULL,
    `altura` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `id_direccion` FOREIGN KEY (`id_direccion`) REFERENCES `Direccion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
