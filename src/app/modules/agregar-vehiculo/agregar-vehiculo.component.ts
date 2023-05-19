import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { VehiculoDto, VehiculoInterface } from '../componentes-comunes/interfaces/vehiculo.interface';
import { VehiculoService } from '../componentes-comunes/servicios/vehiculo.service';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.component.html',
  styleUrls: ['./agregar-vehiculo.component.css']
})
export class AgregarVehiculoComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['placa', 'marca', 'estado', 'tipo', 'modelo', 'color', 'peso', 'acciones'];
  dataSource = new MatTableDataSource<VehiculoInterface>();
  inicio: Boolean = true;
  generalFormGroup!: FormGroup;
  viewing: Boolean = true;
  btnSave!: boolean;
  readonly!: boolean;

  constructor(private vehiculoService: VehiculoService,
    private snack: MatSnackBar) {
    this.generalFormGroup = new FormGroup({
      placa: new FormControl({value: "", disabled: false}),
      marca: new FormControl({value: "", disabled: false}),
      estado: new FormControl({value: "", disabled: true}),
      tipo: new FormControl({value: "", disabled: false}),
      modelo: new FormControl({value: "", disabled: false}),
      color: new FormControl({value: "", disabled: false}),
      peso: new FormControl({value: "", disabled: false})       
    })
   }

  ngOnInit(): void {
    this.inicio = true;
    this.viewing= true;
    this.vehiculoService.getAll().subscribe(res =>{
      console.log("QUE TRAE",res);
      
      this.dataSource.data = res;
    })
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  modificar(item: VehiculoInterface){
    this.inicio = false;
    this.viewing = false;
    this.readonly = true;
    this.btnSave = false;
    this.generalFormGroup.patchValue({
      placa: item.placaVehiculo,
      marca: item.marcaVehiculo,
      estado: item.estadoVehiculo,
      tipo: item.tipoVehiculo,
      modelo: item.modeloVehiculo,
      color: item.colorVehiculo,
      peso: item.pesoVehiculo
    });
    
  }

  createTransportista(){
    this.viewing = false;
    this.btnSave = true;
    this.inicio = false;
    this.readonly = false;
    this.generalFormGroup.reset();
  }

  guardar(){
    const transportista: VehiculoInterface = { 
      placaVehiculo: this.generalFormGroup.get('placa')?.value,
      marcaVehiculo: this.generalFormGroup.get('marca')?.value,
      estadoVehiculo: this.generalFormGroup.get('estado')?.value,
      tipoVehiculo: this.generalFormGroup.get('tipo')?.value,
      modeloVehiculo: this.generalFormGroup.get('modelo')?.value,
      colorVehiculo: this.generalFormGroup.get('color')?.value,
      pesoVehiculo: this.generalFormGroup.get('peso')?.value,
      fechaCreacion: new Date(),
      usuarioCreacion: "prueba"

  }

  this.vehiculoService.editar(transportista).subscribe(res =>{
    if(res){
      Swal.fire("Cambio exitoso", 'Se modificó correctamente el vehículo','success').then(()=>{
        this.ngOnInit();
      })
    }else{
      this.snack.open('No se pudo guardar los cambios', 'Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
  })
  }

  cancelar(){
    this.inicio = true;
    this.viewing= true;
    this.generalFormGroup.reset();
  }

  save(){

    const vehiculo: VehiculoDto = {
      placa: this.generalFormGroup.get('placa')?.value,
        marca: this.generalFormGroup.get('marca')?.value,
        modelo:  this.generalFormGroup.get('modelo')?.value,
        color: this.generalFormGroup.get('color')?.value,
        tipo: this.generalFormGroup.get('tipo')?.value,
        peso: this.generalFormGroup.get('peso')?.value,
  }

  console.log("Parametros:", vehiculo);
  
  this.vehiculoService.registrar(vehiculo).subscribe(res =>{
    if(res){
      Swal.fire("Creación exitosa", 'Se agrego correctamente el vehiculo','success').then(()=>{
        this.ngOnInit();
      })
    }else{
      this.snack.open('No se pudo agregar el vehiculo', 'Aceptar',{
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right'
      });
    }
  })

  }

}
