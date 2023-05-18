export interface ParcialidadInterface {
  idCuentaCorriente?: number;
  fechaEnvio?: Date;
  autorizo?: string;
  fechaEntrega?: Date;
  numeroCuenta: string;
  peso: number;
  idParcialidad: number;
  placa?: string;
  licencias?: string;
  estado: number;
  nombreEstado: string;
}

export interface EnvioParcialidadInterface {
    idCuentaCorriente: number; 
    numeroCuenta: string;
    placaVehiculo: string;
    idParcialidad: number;
    peso: number;
    mensaje?: string;
    licenciasTransportistas: string;
}