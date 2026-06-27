import { prisma } from "../prisma.js";

export class ProductoRepository {

    async findAll() {
        return prisma.producto.findMany();
    }

    async findById(id: number) {
        return prisma.producto.findUnique({
            where: { id }
        });
    }

    async create(data: {
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: number;
        usuario_id: number;
    }) {

        return prisma.producto.create({
            data
        });
    }
}