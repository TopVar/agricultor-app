import { Component, OnInit } from '@angular/core';
import { LoginService } from '../componentes-comunes/servicios/login.service';
import { AutenticationInterface } from '../componentes-comunes/interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
