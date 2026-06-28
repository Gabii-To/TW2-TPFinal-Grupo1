

// export class CarritoController {
//     private carritoRepository = new CarritoRepository();
//     private carritoService = new CarritoService();

//     async obtenerCarrito(req: Request, res: Response) {
//         try {
//             const usuarioId = req.query.usuarioId as string;
//             const carrito = await CarritoService.obtenerCarrito(usuarioId);
//             res.json(carrito);
//         } catch (error) {
//             res.status(500).json({ error: 'Error al obtener el carrito' });
//         }
//     }

//     async agregarAlCarrito(req: Request, res: Response) {
//         try {
//             const { usuarioId, productoId } = req.body;
//             await CarritoService.agregarAlCarrito(usuarioId, productoId);
//             res.json({ message: 'Producto agregado al carrito' });
//         } catch (error) {
//             res.status(500).json({ error: 'Error al agregar el producto al carrito' });
//         }
//     }

//     async finalizarCompra(req: Request, res: Response) {
//         try {
//             const { usuarioId } = req.body;
//             await CarritoService.finalizarCompra(usuarioId);
//             res.json({ message: 'Compra finalizada' });
//         } catch (error) {
//             res.status(500).json({ error: 'Error al finalizar la compra' });
//         }
//     }
// }