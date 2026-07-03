import { prisma } from "../prisma.js";
export class UsuarioRepository {
    async findUsuarioByEmail(email) {
        return await prisma.usuario.findUnique({
            where: { email },
        });
    }
    //getusuario, editar, eliminar?
    async createUsuario(data) {
        return await prisma.usuario.create({
            data,
        });
    }
    async obtenerPorId(id) {
        return await prisma.usuario.findUnique({
            where: { id }
        });
    }
    async editarUsuario(id, data) {
        return await prisma.usuario.update({
            where: { id },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                email: data.email,
                direccion: data.direccion
            }
        });
    }
    async eliminarUsuario(id) {
        return await prisma.usuario.delete({
            where: { id }
        });
    }
    async editarPassword(id, password) {
        return await prisma.usuario.update({
            where: { id },
            data: { password }
        });
    }
}
//# sourceMappingURL=usuario.repository.js.map