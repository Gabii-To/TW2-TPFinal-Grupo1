-- DropForeignKey
ALTER TABLE `producto_pedido` DROP FOREIGN KEY `producto_pedido_pedido_id_fkey`;

-- AddForeignKey
ALTER TABLE `producto_pedido` ADD CONSTRAINT `producto_pedido_pedido_id_fkey` FOREIGN KEY (`pedido_id`) REFERENCES `pedido`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
