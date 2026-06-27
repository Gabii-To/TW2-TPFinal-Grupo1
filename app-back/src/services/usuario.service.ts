import type { Usuario } from "../models/usuario.model.js";
import type { UsuarioRepository } from "../repository/usuario.repository.js";

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

        const usuarioCreado = await this.usuarioRepository.createUsuario({
            email,
            password,
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

        if (!usuario || usuario.password !== password) {
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
}
