import { prisma } from "../prisma.js";

export class UsuarioRepository {

    async getUsuarios() {
        return prisma.usuario.findMany();
    }

    async getUsuarioPorId(id: number) {

        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario) {
            throw new Error("USER_NOT_FOUND");
        }

        return usuario;
    }

    async crearUsuario(
        email: string,
        password: string,
        nombre: string,
        apellido: string,
        direccion: string
    ) {

        const existeUsuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (existeUsuario) {
            throw new Error("EMAIL_EXISTS");
        }

        return prisma.usuario.create({
            data: {
                email,
                password,
                nombre,
                apellido,
                direccion
            }
        });
    }

    async editarUsuario(
        id: number,
        email: string,
        nombre: string,
        apellido: string,
        direccion: string
    ) {

        const existeUsuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!existeUsuario) {
            throw new Error("USER_NOT_FOUND");
        }

        return prisma.usuario.update({
            where: { id },
            data: {
                email,
                nombre,
                apellido,
                direccion
            }
        });
    }

    async eliminarUsuario(id: number) {

        const existeUsuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!existeUsuario) {
            throw new Error("USER_NOT_FOUND");
        }

        await prisma.usuario.delete({
            where: { id }
        });

        return true;
    }
}