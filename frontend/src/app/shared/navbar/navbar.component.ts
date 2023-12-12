import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}
  cerrarSesion(): void {
    this.authService.logOut();
  }
}
