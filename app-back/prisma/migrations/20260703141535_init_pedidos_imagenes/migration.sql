/*
  Warnings:

  - You are about to alter the column `estado` on the `pedido` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `Enum(EnumId(0))`.
  - You are about to drop the column `id_direccion` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `direccion` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `direccion` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `id_direccion`;

-- DropIndex
DROP INDEX `usuario_id_direccion_key` ON `usuario`;

-- AlterTable
ALTER TABLE `pedido` MODIFY `estado` ENUM('CARRITO', 'PENDIENTE', 'PAGO', 'CANCELADO') NOT NULL DEFAULT 'CARRITO';

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `id_direccion`,
    ADD COLUMN `direccion` VARCHAR(150) NOT NULL,
    MODIFY `nombre` VARCHAR(50) NOT NULL,
    MODIFY `apellido` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(100) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `direccion`;
