import { prisma } from "../prisma.js";
export class UsuarioRepository {
    async findUsuarioByEmail(email) {
        return await prisma.usuario.findUnique({
            where: { email },
        });
    }
    async createUsuario(data) {
        return await prisma.usuario.create({
            data,
        });
    }
}
//# sourceMappingURL=usuario.repository.js.map