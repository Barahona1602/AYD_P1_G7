import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public authService: AuthService,
    private router: Router) {}


  verLibros(): void {
    this.router.navigate(["libros"]);
  }
  verBiblioteca(): void {
    this.router.navigate(["biblioteca"]);
  }
  verPerfil(): void {
    this.router.navigate(["perfil"]);
  }
  verUsuarios(): void {
    this.router.navigate(["usuarios"]);
  }
}
