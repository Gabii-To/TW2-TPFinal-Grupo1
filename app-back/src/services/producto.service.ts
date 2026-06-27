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
}
