import type { ProductoImagenCreateData, ProductoRepository } from "../repository/producto.repository.js";

export interface ProductoImagenInput {
    datos?: string;
    tipo_mime?: string;
}

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
        imagenes?: ProductoImagenInput[];
    }) {
        console.log("[Back][ProductoService] crearProducto data:", data);
        const { imagenes = [], ...productoData } = data;

        return await this.productoRepository.create({
            ...productoData,
            imagenes: this.prepararImagenes(imagenes),
        });
    }

    private prepararImagenes(imagenes: ProductoImagenInput[]): ProductoImagenCreateData[] {
        return imagenes
            .map((imagen) => this.normalizarImagen(imagen))
            .filter((imagen): imagen is Required<ProductoImagenInput> => imagen !== null)
            .map((imagen, index) => ({
                datos: imagen.datos,
                tipo_mime: imagen.tipo_mime,
                orden: index,
            }));
    }

    private normalizarImagen(imagen: ProductoImagenInput): Required<ProductoImagenInput> | null {
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
