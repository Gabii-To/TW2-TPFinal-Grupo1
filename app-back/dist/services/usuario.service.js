import bcrypt from 'bcrypt';
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
}
//# sourceMappingURL=usuario.service.js.map