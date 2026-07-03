export declare class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    clasificacion: string;
    precio: number;
    imagenes: ProductoImagen[];
}
export declare class ProductoImagen {
    id: number;
    producto_id: number;
    datos: string;
    tipo_mime: string;
    orden: number;
}
//# sourceMappingURL=producto.model.d.ts.map