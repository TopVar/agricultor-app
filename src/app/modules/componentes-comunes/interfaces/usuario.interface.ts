    export interface UsuarioInterface{
        idUsuario: string;
        nombreUsuario: string;
        telefonoUsuario: string;
        emailUsuario: string;
        password: string;
        roles: string;
    }

    export interface LoginParams{
        token: string;
        username: string;
    }


    export interface AutenticationInterface {
        token: string;
        username: string;
        roles: string;
        nombre: string;
        correo: string;
    }