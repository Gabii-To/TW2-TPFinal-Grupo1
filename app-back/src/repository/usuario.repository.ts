import type { Usuario } from "../models/usuario.model.js";
import { prisma } from "../prisma.js";

export class UsuarioRepository {
    async findUsuarioByEmail(email: string) {
        return await prisma.usuario.findUnique({
            where: { email },
        });
    }

    async createUsuario(data: Omit<Usuario, "id">) {
        return await prisma.usuario.create({
            data,
        });
    }
}
