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
        const { imagenes = [], ...productoData } = data;
        return await this.productoRepository.create({
            ...productoData,
            imagenes: this.prepararImagenes(imagenes),
        });
    }
    prepararImagenes(imagenes) {
        return imagenes
            .map((imagen) => this.normalizarImagen(imagen))
            .filter((imagen) => imagen !== null)
            .map((imagen, index) => ({
            datos: imagen.datos,
            tipo_mime: imagen.tipo_mime,
            orden: index,
        }));
    }
    normalizarImagen(imagen) {
        if (!imagen?.datos || !imagen?.tipo_mime) {
            return null;
        }
        const dataUrlMatch = imagen.datos.match(/^data:(.+);base64,(.+)$/);
        if (dataUrlMatch?.[1] && dataUrlMatch[2]) {
            return {
                tipo_mime: dataUrlMatch[1],
                datos: dataUrlMatch[2],
            };
        }
        return {
            tipo_mime: imagen.tipo_mime,
            datos: imagen.datos,
        };
    }
}
//# sourceMappingURL=producto.service.js.map