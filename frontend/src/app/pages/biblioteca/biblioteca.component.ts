import { Component, OnInit } from '@angular/core';
import * as moment from "moment";
import { PagesService } from '../pages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionModalComponent } from 'src/app/modals/confirm-action-modal/confirm-action-modal.component';

enum VIEWS {
  RENTAS = "RENTAS",
  COMPRAS = "COMPRAS"
}

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {
  vistaActiva = VIEWS.COMPRAS;

  loading: boolean = false;

  librosComprados: any[] = [];
  librosRentados: any[] = [];

  constructor(
    private pagesService: PagesService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.verCompras();
  }

  verRentas(): void {
    this.vistaActiva = VIEWS.RENTAS;
    this.getLibrosRentados();
  }

  verCompras(): void {
    this.vistaActiva = VIEWS.COMPRAS;
    this.getLibrosComprados();
  }

  getLibrosComprados(): void {
    this.loading = true;
    this.pagesService.getLibrosCompradosDeUsuario(this.authService.user["id_usuario"]).subscribe(resp => {
      // console.log(resp);
      this.librosComprados = resp.ventas;
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  getLibrosRentados(): void {
    this.loading = true;
    this.pagesService.getLibrosRentadosDeUsuario(this.authService.user["id_usuario"]).subscribe(resp => {
      const ahora = moment();
      resp.rentas = resp.rentas.map(libro => {
        const fechaDeRetorno = moment(libro.fecha_devolucion);
        libro.atrasado = ahora.isAfter(fechaDeRetorno);
        return libro;
      });
      this.librosRentados = resp.rentas;
      console.log(this.librosRentados);
      this.loading = false;
    }, err => {
      console.log(err);
      this.loading = false;
    });
  }

  retornarLibro(libro: any): void {
    const modal = this.modalService.open(ConfirmActionModalComponent);
    modal.componentInstance.title = "Retornar Libro";
    modal.componentInstance.description = "Estas seguro de que quieres devolver el libro?";
    modal.result.then(result => {
      const body = {
        id_renta: libro.id_renta
      };
      this.pagesService.devolverLibro(libro.id_libro, body).subscribe(resp => {
        this.verRentas();
      }, err => {
        console.log(err);
      });
    }, dismiss => {});
  }
}
