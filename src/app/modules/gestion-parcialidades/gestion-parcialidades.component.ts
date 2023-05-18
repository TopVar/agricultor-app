import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BandejaCuentas } from '../componentes-comunes/interfaces/cuenta.interface';
import { EnvioParcialidadInterface, ParcialidadInterface } from '../componentes-comunes/interfaces/parcialidad.interface';
import { VehiculoInterface } from '../componentes-comunes/interfaces/vehiculo.interface';
import { TransportistaInterface } from '../componentes-comunes/interfaces/transportista.interface';
import { ParcialidadService } from '../componentes-comunes/servicios/parcialidad.service';
import { TransportistaService } from '../componentes-comunes/servicios/transportista.service';
import { VehiculoService } from '../componentes-comunes/servicios/vehiculo.service';
import { CuentaService } from '../componentes-comunes/servicios/cuenta.service';

@Component({
  selector: 'app-gestion-parcialidades',
  templateUrl: './gestion-parcialidades.component.html',
  styleUrls: ['./gestion-parcialidades.component.css']
})
export class GestionParcialidadesComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['id','peso', 'cantidad','agricultor', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<BandejaCuentas>();
  inicio: Boolean = true;
  generalFormGroup!: FormGroup;
  displayedColumns2: string[] = ['id', 'cuenta', 'peso', 'estado', 'acciones'];
  dataSource2 = new MatTableDataSource<ParcialidadInterface>();
  detalleFormGroup!: FormGroup
  listVehiculos!: VehiculoInterface[];
  selected!: string;
  listTransportistas!: TransportistaInterface[];

  constructor(private cuentaService: CuentaService,
    private parcialidadService: ParcialidadService,
    private transportistaService: TransportistaService,
    private vehiculoService: VehiculoService,
    private snack: MatSnackBar) {

    this.generalFormGroup = new FormGroup({
      peso: new FormControl({value: "", disabled: true}),
      cantidadParcialidades: new FormControl({value: "", disabled: true}),
      agricultor: new FormControl({value: "", disabled: true}),
      estado: new FormControl({value: "", disabled: true}),
    })

    this.detalleFormGroup = new FormGroup({
      vehiculoSeleccionable: new FormControl()
    })
   }

  ngOnInit(): void {
    this.inicio = true;
    this.cuentaService.getCuentasGeneral().subscribe(res =>{
      console.log(res);
      this.dataSource.data = res
      
    })
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  regresar(){
    this.inicio = true;
  }

  verDetalle(item: BandejaCuentas){
    this.inicio = false;

    this.generalFormGroup.patchValue({
      peso: item.peso,
      cantidadParcialidades: item.cantidad,
      agricultor: item.agricultor,
      estado: item.estadoNombre
    })

    this.parcialidadService.getParcialidadesCuenta(item.idCuentaCorriente).subscribe(res =>{
      console.log(res);
      
      this.dataSource2.data = res
    })

    this.vehiculoService.vehculosDisponiblesAutorizados(item.idCuentaCorriente).subscribe(res =>{
      console.log("VEHICULOS",res);
      this.listVehiculos = res;
      
    })

    this.transportistaService.transportistaDisponibleAutorizados(item.idCuentaCorriente).subscribe(res =>{
      console.log("TRANSPORTISTAs", res);
      this.listTransportistas = res
    })


  }

  enviarParcialidad(item: ParcialidadInterface){
    const vehiculo = this.detalleFormGroup.get('vehiculoSeleccionable')?.value
    const param: EnvioParcialidadInterface = {
      idCuentaCorriente: item.idCuentaCorriente!,
      idParcialidad: item.idParcialidad,
      licenciasTransportistas: this.selected,
      mensaje: "",
      numeroCuenta: item.numeroCuenta,
      peso: item.peso,
      placaVehiculo:  vehiculo.placaVehiculo
    }

    console.log(param);
    

    this.parcialidadService.envioParcialidad(param).subscribe(res =>{
      console.log(res);
      if(res){
        Swal.fire("Cambio exitoso", 'Se mando la parcialidad correctamente','success');
        this.ngOnInit();
      }else{
        this.snack.open('No se pudo guardar los cambios', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
      
    })

  }

  validated(item: ParcialidadInterface):Boolean{
    const index = this.dataSource2.data.findIndex(k => k.idParcialidad == item.idParcialidad)
    const i =  index - 1 < 0 ? 0 : index -1
    let validation = this.dataSource2.data[0] == item? true: false;
    validation = item.estado == 10  && !validation ? true : false
    console.log(item.estado);
    console.log(this.dataSource2.data[i].estado);
    console.log(i);
    
    
    validation = this.dataSource2.data[i].estado == 13 && validation ? true : false
    //validation = this.dataSource2.data.filter(e => e.estado == 10)[0] == item && !validation? true : false 
    console.log(validation);
    
    return validation;

  }


}
