import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";

export class AuthRepository {

    async login(email: string, password: string) {

        const usuario = await prisma.usuario.findFirst({
            where: { email }
        });

        if (!usuario) {
            throw new Error("USER_NOT_FOUND");
        }

        const passwordCorrecta = await bcrypt.compare(
            password,
            usuario.password
        );

        if (!passwordCorrecta) {
            throw new Error("INVALID_PASSWORD");
        }

        return usuario;
    }

    async register(
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

        const passwordEncriptada = await bcrypt.hash(password, 10);

        return prisma.usuario.create({
            data: {
                email,
                password: passwordEncriptada,
                nombre,
                apellido,
                direccion
            }
        });
    }

    async cambiarPassword(
        id: number,
        passwordActual: string,
        passwordNueva: string
    ) {

        const usuario = await prisma.usuario.findUnique({
            where: { id }
        });

        if (!usuario) {
            throw new Error("USER_NOT_FOUND");
        }

        const passwordCorrecta = await bcrypt.compare(
            passwordActual,
            usuario.password
        );

        if (!passwordCorrecta) {
            throw new Error("INVALID_PASSWORD");
        }

        const nuevaPassword = await bcrypt.hash(passwordNueva, 10);

        await prisma.usuario.update({
            where: { id },
            data: {
                password: nuevaPassword
            }
        });

        return true;
    }
}