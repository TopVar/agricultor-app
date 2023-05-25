import { Component, OnInit } from '@angular/core';
import { AutenticationInterface } from '../componentes-comunes/interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  user!: string;
  roles!: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
     const authDataString = sessionStorage.getItem('authData');
      const authData: AutenticationInterface = JSON.parse(authDataString!);
      this.roles = authData.roles;
      console.log("roles", this.roles);
      
    }

    logout(){
      sessionStorage.removeItem('authData');
      this.router.navigateByUrl('/login').then(() => window.location.reload());
    }

}
