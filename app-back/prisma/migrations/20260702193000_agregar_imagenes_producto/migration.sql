-- CreateTable
CREATE TABLE `producto_imagen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_id` INTEGER NOT NULL,
    `datos` LONGTEXT NOT NULL,
    `tipo_mime` VARCHAR(100) NOT NULL,
    `orden` INTEGER NOT NULL DEFAULT 0,

    INDEX `fk_producto_imagen_producto`(`producto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `producto_imagen` ADD CONSTRAINT `producto_imagen_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `producto`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
