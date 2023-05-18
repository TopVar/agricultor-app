    export interface TransportistaInterface{
        idLicencia: string;
        estadoTransportista: number;
        tipoLicencia: string;
        nombreTransportista: string;
        telefonoTransportista: string;
        emailTransportista: string;
        usuarioCreacion?: string;
        fechaCreacion?: Date;
    }

    export interface TransportistaDto{
        licencia: string;
        tipoLicencia: string;
        nombre: string;
        telefono: string;
        email: string;
        estado?: number;
    }
