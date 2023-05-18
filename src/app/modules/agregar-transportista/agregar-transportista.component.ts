import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { TransportistaDto, TransportistaInterface } from '../componentes-comunes/interfaces/transportista.interface';
import { TransportistaService } from '../componentes-comunes/servicios/transportista.service';

@Component({
  selector: 'app-agregar-transportista',
  templateUrl: './agregar-transportista.component.html',
  styleUrls: ['./agregar-transportista.component.css']
})
export class AgregarTransportistaComponent implements OnInit {

  @ViewChild('MatPaginator2') set matPaginator2(mp2: MatPaginator) {
    this.dataSource.paginator = mp2;
  }

  displayedColumns: string[] = ['licencia', 'nombre', 'estado', 'tipo', 'tel', 'correo', 'acciones'];
  dataSource = new MatTableDataSource<TransportistaInterface>();
  inicio: Boolean = true;
  generalFormGroup!: FormGroup;
  viewing: Boolean = true;
  btnSave!: boolean;
  readonly!: boolean;
  qr!: Boolean

  constructor(private snack: MatSnackBar, 
    private transportistaService: TransportistaService) {
    
   }

  ngOnInit(): void {
    
    this.transportistaService.getAll().subscribe(res =>{
      console.log("QUE TRAE",res);
      
      this.dataSource.data = res;
    })

    this.initForms();
    this.inicio= true;
    this.viewing = true;
  }

  applyFilter(event: Event){
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  modificar(item: TransportistaInterface){
    console.log(item);
    this.inicio = false;
    this.viewing = false;
    this.readonly = true;
    this.btnSave = false;
    this.generalFormGroup.patchValue({
      licencia: item.idLicencia,
      nombre: item.nombreTransportista,
      estado: item.estadoTransportista,
      tipo: item.tipoLicencia,
      tel: item.telefonoTransportista,
      correo: item.emailTransportista
    });
    
  }

  createTransportista(){
    this.viewing = false;
    this.btnSave = true;
    this.inicio = false;
    this.readonly = false;

  }

  guardar(){

    const transportista: TransportistaInterface = {
        idLicencia: this.generalFormGroup.get('licencia')?.value,
        estadoTransportista: this.generalFormGroup.get('estado')?.value,
        tipoLicencia: this.generalFormGroup.get('tipo')?.value,
        nombreTransportista: this.generalFormGroup.get('nombre')?.value,
        telefonoTransportista: this.generalFormGroup.get('tel')?.value,
        emailTransportista: this.generalFormGroup.get('correo')?.value,
        usuarioCreacion: 'prueba',
        fechaCreacion: new Date()
    }

    this.transportistaService.editar(transportista).subscribe(res =>{
      if(res){
        Swal.fire("Cambio exitoso", 'Se modificó correctamente el trasnportista','success').then(() =>{
          this.qr = true
        });
        
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
  }

  save(){

    const transportista: TransportistaDto = {
      licencia: this.generalFormGroup.get('licencia')?.value,
      tipoLicencia: this.generalFormGroup.get('tipo')?.value,
      nombre: this.generalFormGroup.get('nombre')?.value,
      telefono: this.generalFormGroup.get('tel')?.value,
      email: this.generalFormGroup.get('correo')?.value
  }
  this.transportistaService.registrar(transportista).subscribe(res =>{
    if(res){
      Swal.fire("Creación exitosa", 'Se agrego correctamente al trasnportista','success');
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

  private initForms(){
    this.generalFormGroup = new FormGroup({
      licencia: new FormControl({value: "", disabled: this.readonly}),
      nombre: new FormControl({value: "", disabled: false}),
      estado: new FormControl({value: "", disabled: true}),
      tipo: new FormControl({value: "", disabled: false}),
      tel: new FormControl({value: "", disabled: false}),
      correo: new FormControl({value: "", disabled: false})      
    })
  }

}
