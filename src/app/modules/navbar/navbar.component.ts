import { Component, OnInit } from '@angular/core';
import { LoginService } from '../componentes-comunes/servicios/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  public  logout(){
    this.loginService.logout();
    window.location.reload();
  }

}
