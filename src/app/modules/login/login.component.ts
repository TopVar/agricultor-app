import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../componentes-comunes/servicios/login.service';
import { AutenticationInterface } from '../componentes-comunes/interfaces/usuario.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  generalFormGroup!: FormGroup;
  roles!: string;

  constructor(private loginService: LoginService, 
    private router: Router,
    private snack: MatSnackBar) { 
      this.generalFormGroup =  new FormGroup({
        user: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {}

  login(){
    let user = this.generalFormGroup.get("user")?.value
    let pass = this.generalFormGroup.get("password")?.value
//'bcuser1', 'admin'
    console.log("QUE TRAE: ", user, pass);
    
    this.loginService.login(user, pass).subscribe((response: AutenticationInterface) => {
      const serializedResponse = JSON.stringify(response);
      sessionStorage.setItem('authData', serializedResponse);
      const roles: string[] = response.roles.split(',');

      if(response != null){
          this.router.navigate(['agricultor']);
      }else{
        this.snack.open('Acceso Denegado', 'Aceptar',{
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      }
    },
    error => {
      console.log(error);
    });    
  }

}
