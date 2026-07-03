import crypto from 'crypto';
import { prisma } from "../prisma.js";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
const transportadorEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'correoparaprueba026@gmail.com',
        pass: 'lkey lppj mglv afqi'
    }
});
export class UsuarioService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async signup(usuario) {
        const { email, password, nombre, apellido, direccion } = usuario;
        if (!email || typeof email !== "string") {
            throw new Error("El email es obligatorio");
        }
        if (!password || typeof password !== "string") {
            throw new Error("La contrasenia es obligatoria");
        }
        if (!nombre || typeof nombre !== "string") {
            throw new Error("El nombre es obligatorio");
        }
        if (!apellido || typeof apellido !== "string") {
            throw new Error("El apellido es obligatorio");
        }
        if (!direccion || typeof direccion !== "string") {
            throw new Error("La direccion es obligatoria");
        }
        if (!this.passwordValida(password)) {
            throw new Error("PasswordDebil");
        }
        const usuarioExistente = await this.usuarioRepository.findUsuarioByEmail(email);
        if (usuarioExistente) {
            throw new Error("EmailRepetido");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const usuarioCreado = await this.usuarioRepository.createUsuario({
            email,
            password: hashedPassword,
            nombre,
            apellido,
            direccion,
        });
        return this.ocultarPassword(usuarioCreado);
    }
    async signin(email, password) {
        if (!email || !password) {
            throw new Error("EmailPasswordObligatorios");
        }
        const usuario = await this.usuarioRepository.findUsuarioByEmail(email);
        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            throw new Error("CredencialesInvalidas");
        }
        return this.ocultarPassword(usuario);
    }
    passwordValida(password) {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
        return regex.test(password);
    }
    ocultarPassword(usuario) {
        const { password, ...usuarioSinPassword } = usuario;
        return usuarioSinPassword;
    }
    async getDatosDeUsuario(id) {
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return null;
        }
        return this.ocultarPassword(usuario);
    }
    async editarUsuario(id, data) {
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return null;
        }
        const usuarioEditado = await this.usuarioRepository.editarUsuario(id, data);
        return this.ocultarPassword(usuarioEditado);
    }
    async eliminarUsuario(id) {
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return null;
        }
        const eliminado = await this.usuarioRepository.eliminarUsuario(id);
        return this.ocultarPassword(eliminado);
    }
    async cambiarPassword(id, passwordActual, passwordNueva) {
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        // validar password actual
        const esValida = await bcrypt.compare(passwordActual, usuario.password);
        if (!esValida) {
            throw new Error("La contraseña actual es incorrecta");
        }
        // validar nueva password
        if (!this.passwordValida(passwordNueva)) {
            throw new Error("PasswordDebil");
        }
        // hash nueva password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordNueva, salt);
        // actualizar
        const usuarioActualizado = await this.usuarioRepository.editarPassword(id, hashedPassword);
        return this.ocultarPassword(usuarioActualizado);
    }
    async enlaceRecuperarClave(email) {
        const usuario = await this.usuarioRepository.findUsuarioByEmail(email);
        if (!usuario) {
            throw new Error("UsuarioNoEncontrado");
        }
        const token = crypto.randomBytes(32).toString('hex');
        const vencimiento = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
        await prisma.token_recuperacion.create({
            data: {
                token: token,
                expira_en: vencimiento,
                usuario_id: usuario.id
            }
        });
        //renovar-clave
        const linkRecuperacion = 'http://localhost:4200/auth/renovar-clave/' + token;
        await transportadorEmail.sendMail({
            from: '"Sistema de Recuperación de Clave" <correoparaprueba026@gmail.com>',
            to: email,
            subject: 'Restablecer tu contraseña',
            html: `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 40px 10px; min-width: 100%;">
        <div style="max-w: 500px; margin: 0 auto; background-color: #ffffff; padding: 30px; rounded-xl: 12px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border-top: 4px solid #2563eb;">
            
            <div style="text-align: center; margin-bottom: 25px;">
                <h2 style="color: #1f2937; margin-top: 10px; font-size: 22px; font-weight: 700;">Recuperación de Contraseña</h2>
            </div>
            
            <!-- Cuerpo del mensaje -->
            <p style="color: #4b5563; font-size: 16px; line-height: 24px; margin-bottom: 20px;">
                Hola <strong>${usuario.nombre}</strong>,
            </p>
            <p style="color: #4b5563; font-size: 15px; line-height: 24px; margin-bottom: 30px;">
                Hemos recibido una solicitud para restablecer la contraseña de tu cuenta. Para continuar con el proceso, haz clic en el siguiente botón:
            </p>
            
            <!-- Botón de Acción Estilizado -->
            <div style="text-align: center; margin-bottom: 35px;">
                <a href="${linkRecuperacion}" style="background-color: #2563eb; color: #ffffff; padding: 12px 30px; text-decoration: none; font-size: 15px; font-weight: 600; border-radius: 6px; display: inline-block; box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2); transition: background-color 0.2s;">
                    Restablecer Contraseña
                </a>
            </div>
            
            <!-- Alerta de Vencimiento -->
            <div style="background-color: #fef3c7; border-left: 4px solid #d97706; padding: 12px; border-radius: 4px; margin-bottom: 25px;">
                <p style="color: #92400e; font-size: 13px; margin: 0; line-height: 18px;">
                     <strong>Información importante:</strong> Este enlace expirará estrictamente en <strong>15 minutos</strong> por motivos de seguridad. Si el enlace vence, deberás solicitar uno nuevo.
                </p>
            </div>
            
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin-bottom: 20px;" />
            
            <!-- Pie de página -->
            <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0; line-height: 16px;">
                Si tú no solicitaste este cambio, puedes ignorar este correo de forma segura. Tu contraseña actual seguirá siendo la misma.
            </p>
            
        </div>
    </div>
    `
        });
        return { mensaje: "Correo enviado con éxito!!!" };
    }
    async renovarClaveConToken(token, password) {
        const tokenRegistro = await prisma.token_recuperacion.findFirst({
            where: {
                token: token,
                usado: false,
                expira_en: { gte: new Date() }
            },
            include: {
                usuario: true
            }
        });
        if (!tokenRegistro) {
            throw new Error("TokenInvalidoOExpirado");
        }
        if (!this.passwordValida(password)) {
            throw new Error("PasswordDebil");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await prisma.usuario.update({
            where: { id: tokenRegistro.usuario_id },
            data: { password: hashedPassword }
        });
        await prisma.token_recuperacion.update({
            where: { id: tokenRegistro.id },
            data: { usado: true }
        });
        return { mensaje: "Contraseña restablecida con éxito!!!" };
    }
}
//# sourceMappingURL=usuario.service.js.map