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
  qrModalVisible: boolean = false;
  qrCodeUrl!: string;
  nombre!: string;


  constructor(private snack: MatSnackBar, 
    private transportistaService: TransportistaService) {
    
   }

  ngOnInit(): void {

    this.qrModalVisible = false;
    
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
    this.generalFormGroup.reset();

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
        Swal.fire("Cambio exitoso", 'Se modificó correctamente el transportista','success').then(() =>{
          //this.nombre = transportista.nombreTransportista;
          this.generarQR(transportista.idLicencia);
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
    this.generalFormGroup.reset();
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
      Swal.fire("Creación exitosa", 'Se agrego correctamente al transportista','success').then(()=>{
        this.generarQR(res.licencia);
      })
      
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

  generarQR(licencia: String) {
   // this.nombre = item.nombreTransportista;
   // path: 'transportista/validacion/:licencia/:idParcialidad', 
   //path nube:  https://beneficio-cafe-app.azurewebsites.net/#/transportista/validacion/GHIJKL67890/67
    //const data = 'https://beneficio-cafe-app.azurewebsites.net/#/transportista/validacion/GHIJKL67890/67';
    const data = 'https://beneficio-cafe-app.azurewebsites.net/#/transportista/validacion/'+ licencia;
    const size = '150x150';
    this.transportistaService.generateQRCode(data, size).subscribe(
      (blob: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.qrCodeUrl = reader.result as string;
          this.qrModalVisible = true; // Show the modal
        };
        reader.readAsDataURL(blob);
      },
      (error: any) => {
        console.error('Failed to generate QR code:', error);
      }
    );
  }

  printQRCode() {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const document = printWindow.document;
      document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body {
                margin: 0; 
                font-family: Roboto, "Helvetica Neue", sans-serif; 
                background: #f5f5f5;

                text-align: center;
              }
              h3 {
                margin-top: 30px;
              }
              img {
                margin-top: 20px;
                max-width: 100%;
              }
            </style>
          </head>
          <body>
            <img src="${this.qrCodeUrl}" alt="QR Code">
          </body>
        </html>
      `);
      document.close();
      printWindow.print();
    }
  }

}
