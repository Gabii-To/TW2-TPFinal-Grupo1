export class Producto {
    id!: number;
    nombre!: string;
    descripcion!: string;
    clasificacion!: string;
    precio!: number;
    imagenes!: ProductoImagen[];
}

export class ProductoImagen {
    id!: number;
    producto_id!: number;
    datos!: string;
    tipo_mime!: string;
    orden!: number;
}
