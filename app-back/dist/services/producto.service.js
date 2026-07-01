export class ProductoService {
    productoRepository;
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
    }
    async obtenerProductos() {
        console.log("[Back][ProductoService] obtenerProductos");
        return await this.productoRepository.findAllProductos();
    }
    async obtenerProducto(id) {
        console.log("[Back][ProductoService] obtenerProducto id:", id);
        return await this.productoRepository.findProductoById(id);
    }
}
//# sourceMappingURL=producto.service.js.map