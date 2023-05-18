import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CuentaInterface, VehiculosAsignados } from '../componentes-comunes/interfaces/cuenta.interface';
import { VehiculoInterface, vehiculoAutorizadoInterface } from '../componentes-comunes/interfaces/vehiculo.interface';
import { TransportistaDto, TransportistaInterface } from '../componentes-comunes/interfaces/transportista.interface';
import { CuentaService } from '../componentes-comunes/servicios/cuenta.service';
import { VehiculoService } from '../componentes-comunes/servicios/vehiculo.service';
import { TransportistaService } from '../componentes-comunes/servicios/transportista.service';

@Component({
  selector: 'app-agregar-cuenta',
  templateUrl: './agregar-cuenta.component.html',
  styleUrls: ['./agregar-cuenta.component.css']
})
export class AgregarCuentaComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['id','peso', 'cantidad','agricultor', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<CuentaInterface>();
  inicio: Boolean = true;
  generalFormGroup!: FormGroup;
  detalleFormGroup!: FormGroup;
  viewing: Boolean = true;
  displayedColumns2: string[] = ['placa', 'marca', 'tipo', 'modelo', 'color'];
  dataSource2 = new MatTableDataSource<VehiculoInterface>();
  displayedColumns3: string[] = ['licencia', 'nombre', 'tipo'];
  dataSource3 = new MatTableDataSource<TransportistaInterface>();
  vehiculosAutorizados: vehiculoAutorizadoInterface[] = [];
  transportistaAutorizados: TransportistaDto[] = [];
  btnVerDetalle: Boolean = false;
  onlyRead: boolean = true;
  btnAsignar: boolean = false;
  vehiculosAsignados: VehiculosAsignados[] = []
  placaSeleccionada: string = ""
  

  constructor(private cuentaService: CuentaService,
    private vehiculoService: VehiculoService,
    private transportistaService: TransportistaService,
    private snack: MatSnackBar) { 

      this.detalleFormGroup = new FormGroup({
        vehiculoSeleccionable: new FormControl(''),
        transportistaSeleccionable: new FormControl({value: "", Validators: Validators.required}),
      })

      this.generalFormGroup = new FormGroup({
        peso: new FormControl({value: "", disabled: false}),
        cantidadParcialidades: new FormControl({value: "", disabled: false}),
      })
    
  }

  ngOnInit(): void {
    this.viewing = false;
    this.inicio = true;
    this.btnVerDetalle = false;
    this.btnAsignar = false;
    this.dataSource3.data = []
    this.cuentaService.getCuentasPorAprobarCorregirRechazadas().subscribe(res =>{
      console.log(res);
      
      this.dataSource.data = res;
    })
  
  }


  dataSeleccionables(){
    this.vehiculoService.vehculosAutorizadosBeneficio().subscribe(v =>{
      console.log("VEHICULOS", v);
      
      this.vehiculosAutorizados = v
    })
  }

  createVenta(){
    this.inicio = false;
    this.btnVerDetalle = false;
    this.onlyRead = true;
    this.viewing = true;
    this.btnAsignar = false;
    this.generalFormGroup.reset()
    this.vehiculosAutorizados = []
    this.dataSeleccionables();
    if(!this.displayedColumns2.includes('acciones')){
      this.displayedColumns2.push('acciones');
    }
    this.dataSource2.data = []
    if(!this.displayedColumns3.includes('acciones')){
      this.displayedColumns3.push('acciones');
    }
    this.dataSource3.data = []
    
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  verDetalle(cuenta: CuentaInterface){
    console.log(cuenta);
    
    this.btnVerDetalle = true;
    this.inicio = false;
    this.onlyRead = true;
    this.viewing = true;
    this.btnAsignar = true;

    this.generalFormGroup.patchValue({
      peso: cuenta.peso,
      cantidadParcialidades: cuenta.cantidad
    })
    if(this.displayedColumns2.includes('acciones')){
      const index = this.displayedColumns2.findIndex(item => 'acciones' === item);
      this.displayedColumns2.splice(index,1);
    }
    const dataVehiculo: VehiculosAsignados [] = cuenta.vehiculos
    const dataV = dataVehiculo.map(element => {return element.detalleVehiculo!});    
    this.dataSource2.data = dataV;
    if(this.displayedColumns3.includes('acciones')){
      const index = this.displayedColumns2.findIndex(item => 'acciones' === item);
      this.displayedColumns3.splice(index,1);
    }
    const dataTransportista = dataVehiculo.flatMap(element =>{ return element.transportistas!});
    this.dataSource3.data = dataTransportista;

  }

  modificar(item: CuentaInterface){
    this.inicio = false;
    this.btnVerDetalle = false;
    this.onlyRead = true;
    this.viewing = true;
    this.dataSeleccionables();
    
    this.generalFormGroup.patchValue({
      peso: item.peso,
      cantidadParcialidades: item.cantidad
    })

    if(!this.displayedColumns2.includes('acciones')){
      this.displayedColumns2.push('acciones');
    }
    if(!this.displayedColumns3.includes('acciones')){
      this.displayedColumns3.push('acciones');
    }

  }

  guardar(){
    const vehiculoAsignado = this.vehiculosAsignados.find(k => k.placa?.match(this.placaSeleccionada))
    this.dataSource3.data.forEach((k) => vehiculoAsignado?.licencias?.push(k.idLicencia))
    this.placaSeleccionada = ""
    console.log(this.vehiculosAsignados);
    
  }

  agregarVehiculo(){
    let vehiculo: vehiculoAutorizadoInterface = this.detalleFormGroup.get('vehiculoSeleccionable')?.value
    console.log(vehiculo);
    let data: VehiculoInterface = {
      colorVehiculo: vehiculo.color,
      estadoVehiculo: vehiculo.estado,
      marcaVehiculo: vehiculo.marca,
      tipoVehiculo: vehiculo.tipoVehiculo,
      modeloVehiculo: vehiculo.modelo,
      pesoVehiculo: vehiculo.peso,
      placaVehiculo: vehiculo.placa
    }
    this.dataSource2.data.push(data)
    this.dataSource2.data = this.dataSource2.data
   console.log(this.dataSource2.data);

      const index = this.vehiculosAutorizados.findIndex(item => item.placa === data.placaVehiculo);
      this.vehiculosAutorizados.splice(index,1)
   
  }

  asignarTransportista(item: VehiculoInterface){
    this.btnVerDetalle = false
    this.btnAsignar = true;
    this.dataSource3.data = [];
    this.placaSeleccionada = item.placaVehiculo
    this.vehiculosAsignados.push({
      placa: item.placaVehiculo,
      licencias: []
    })
    this.transportistaService.transportistaAutorizadoBeneficio().subscribe(t =>{
      console.log("TRANSPORTISTAS ", t);      
      this.transportistaAutorizados = t
    })
  }

  agregarTransportista(){
    let transportista: TransportistaDto = this.detalleFormGroup.get('transportistaSeleccionable')?.value
    let data: TransportistaInterface = {
      emailTransportista: transportista.email,
      estadoTransportista: transportista.estado!,
      idLicencia: transportista.licencia,
      nombreTransportista: transportista.nombre,
      telefonoTransportista: transportista.telefono,
      tipoLicencia: transportista.tipoLicencia
    }
    this.dataSource3.data.push(data)
    this.dataSource3.data = this.dataSource3.data

    const index = this.transportistaAutorizados.findIndex(item => item.licencia === data.idLicencia);
    this.transportistaAutorizados.splice(index,1)
    
  }

  quitarTransportista(item: any){

  }

  quitarVehiculo(item: any){

  }

  regresar(){
    this.inicio = true;
    this.viewing = false;
    this.dataSource3.data = []
  }

  crearCuenta(){
    const objeto: CuentaInterface = {
      cantidad: this.generalFormGroup.get('cantidadParcialidades')?.value,
      peso: this.generalFormGroup.get('peso')?.value,
      vehiculos: this.vehiculosAsignados
    }

    this.cuentaService.crearVenta(objeto).subscribe(res =>{
      if(res){
        Swal.fire("Creaci�n exitosa", 'Se agrego correctamente al trasnportista','success');
        this.ngOnInit()
      }else{
        this.snack.open('No se pudo agregar al transportista', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    })
  }

}
