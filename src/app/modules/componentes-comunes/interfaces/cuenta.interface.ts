import { TransportistaInterface } from "./transportista.interface";
import { VehiculoInterface } from "./vehiculo.interface";

    export interface CuentaBc{
        estadoCuenta: number;
        numeroCuenta: string;
        pesoTotal: number;
        cantidadParcialidades: number;
        usuarioCreacion: string;
        fechaCreacion: Date;
        vehiculosTransportistasAsignados: string;
    }

    export interface CuentaAgr{
        idCuentaCorriente: number;
        estadoCuenta: number;
        numeroCuenta: string;
        pesoTotal: number;
        cantidadParcialidades: number;
        usuarioCreacion: string;
        fechaCreacion: Date;
        vehiculosTransportistasAsignados: string;
    }

    export interface CuentaInterface{
        peso: number;
        cantidad: number;
        agricultor?: string;
        estado?: number;
        estadoNombre?: string;
        idCuentaCorriente?: number;
        vehiculos: VehiculosAsignados[];
    }

    export interface VehiculosAsignados{
        placa?: string;
        licencias?: string[];
        detalleVehiculo?: VehiculoInterface;
        transportistas?: TransportistaInterface[];
    }

    export interface ParamCrearCuenta {
        idVenta: number;
        operacion: number;
        mensaje: string;
    }

    export interface RespuestaCreacion {
        idCuentaCorriente: number;
        numeroCuenta: string;
        mensaje: string;
        aprobado: number;
        correcion: number;
        rechazado: number;
    }

    export interface BandejaCuentas {
        idCuentaCorriente: number;
        numeroCuenta: string;
        peso: number;
        cantidad: number;
        agricultor: string;
        estadoNombre: string;
        estado: number;
    }

    