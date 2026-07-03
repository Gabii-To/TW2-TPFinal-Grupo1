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
    async crearProducto(data) {
        console.log("[Back][ProductoService] crearProducto data:", data);
        return await this.productoRepository.create(data);
    }
}
//# sourceMappingURL=producto.service.js.map