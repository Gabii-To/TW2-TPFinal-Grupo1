import type {Usuario} from "../models/usuario.model.js";
import {prisma} from "../prisma.js";

export class UsuarioRepository {
    async findUsuarioByEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: {email},
        });
    }

    //getusuario, editar, eliminar?
    async createUsuario(data: Omit<Usuario, "id">) {
        return await prisma.usuario.create({
            data,
        });
    }

    async obtenerPorId(id: number) {
        return await prisma.usuario.findUnique({
            where: {id}
        });
    }

    async editarUsuario(id: number, data: {email: string, nombre: string,
        apellido: string, direccion: string}) {
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

    async eliminarUsuario(id: number) {
        return await prisma.usuario.delete({
            where: { id }
        });
    }

    async editarPassword(id: number, password: string) {
        return await prisma.usuario.update({
            where: { id },
            data: { password }
        });
    }
}
