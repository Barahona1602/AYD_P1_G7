import { Component } from '@angular/core';

enum VIEWS {
  RENTAS = "RENTAS",
  COMPRAS = "COMPRAS"
}

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent {
  vistaActiva = VIEWS.COMPRAS;

  verRentas(): void {
    this.vistaActiva = VIEWS.RENTAS;
  }

  verCompras(): void {
    this.vistaActiva = VIEWS.COMPRAS;
  }
}
