import type { ProductoRepository } from "../repository/producto.repository.js";

export class ProductoService {
    constructor(private productoRepository: ProductoRepository) { }

    async obtenerProductos() {
        console.log("[Back][ProductoService] obtenerProductos");
        return await this.productoRepository.findAllProductos();
    }

    async obtenerProducto(id: number) {
        console.log("[Back][ProductoService] obtenerProducto id:", id);
        return await this.productoRepository.findProductoById(id);
    }

    async crearProducto(data: {
        nombre: string;
        descripcion: string;
        clasificacion: string;
        precio: number;
        usuario_id: number;
    }) {
        console.log("[Back][ProductoService] crearProducto data:", data);
        return await this.productoRepository.create(data);
    }
}
