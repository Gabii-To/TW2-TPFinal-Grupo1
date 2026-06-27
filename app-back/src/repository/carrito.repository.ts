// import { prisma } from "../prisma.js";

// export class CarritoRepository {
//     async obtenerCarrito(usuarioId: string) {
//         return await prisma.pedido.findUnique({
//             where: { usuario_id: usuarioId, estado: 'PENDIENTE' },
//             include: { productos: true },
//         });
//     }

//     async agregarAlCarrito(usuarioId: string, productoId: string) {
//         return await prisma.pedido.update({
//             where: { usuario_id: usuarioId, estado: 'PENDIENTE' },
//             data: {
//                 productos: {
//                     connect: { id: productoId },
//                 },
//             },
//         });
//     }

//     async finalizarCompra(usuarioId: string) {
//         return await prisma.pedido.update({
//             where: { usuario_id: usuarioId, estado: 'PENDIENTE' },
//             data: { estado: 'EN_PROCESO' },
//         });
//     }
// }