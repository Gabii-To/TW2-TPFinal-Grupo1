export interface ProductoImagen {
  id?: number;
  producto_id?: number;
  datos: string;
  tipo_mime: string;
  orden?: number;
}

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  clasificacion: string;
  precio: number;
  usuario_id: number;
  imagenes?: ProductoImagen[];
}
