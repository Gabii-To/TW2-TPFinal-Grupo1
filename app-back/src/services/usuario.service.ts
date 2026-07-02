import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";
import bcrypt from 'bcrypt';


export class UsuarioService {
    constructor(private usuarioRepository: UsuarioRepository) { }

    async signup(usuario: Usuario) {
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

    async signin(email: string, password: string) {
        if (!email || !password) {
            throw new Error("EmailPasswordObligatorios");
        }

        const usuario = await this.usuarioRepository.findUsuarioByEmail(email);

        if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
            throw new Error("CredencialesInvalidas");
        }

        return this.ocultarPassword(usuario);
    }

    private passwordValida(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
        return regex.test(password);
    }

    private ocultarPassword(usuario: Usuario) {
        const { password, ...usuarioSinPassword } = usuario;
        return usuarioSinPassword;
    }

    async getDatosDeUsuario(id: number) {
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return null;
        }
        return this.ocultarPassword(usuario);
    }

    async editarUsuario(id: number, data: {email: string, nombre: string,
        apellido: string, direccion: string}) {
        const usuario = await this.usuarioRepository.obtenerPorId(id);
        if (!usuario) {
            return null;
        }
        const usuarioEditado = await this.usuarioRepository.editarUsuario(id, data);
        return  this.ocultarPassword(usuarioEditado);
    }

    async eliminarUsuario(id: number) {
        const usuario = await this.usuarioRepository.obtenerPorId(id);

        if (!usuario) {
            return null;
        }

        const eliminado = await this.usuarioRepository.eliminarUsuario(id);
        return this.ocultarPassword(eliminado);
    }

    async cambiarPassword(
        id: number,
        passwordActual: string,
        passwordNueva: string
    ) {
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
        const usuarioActualizado = await this.usuarioRepository.editarPassword(
            id,
            hashedPassword
        );

        return this.ocultarPassword(usuarioActualizado);
    }
}
