import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '../pages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlquilarLibroComponent } from 'src/app/modals/alquilar-libro/alquilar-libro.component';
import { ConfirmActionModalComponent } from 'src/app/modals/confirm-action-modal/confirm-action-modal.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {
  
  libros: any[] = [];
  loading: boolean = false;
  error: boolean = false;
  
  constructor(
    private router: Router,
    private pagesService: PagesService,
    public authService: AuthService,
    private modalService: NgbModal,
    private currencyPipe: CurrencyPipe
  ) {}
  
  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.loading = true;
    this.pagesService.getLibros().subscribe(resp => {
      console.log(resp);
      if (this.authService.user['id_usuario'] !== "admin") {
        this.libros = resp.libros.filter(libro => libro.estado !== "Vendido");
      } else {
        this.libros = resp.libros;
      }
      this.loading = false;
      this.error = false;
    }, err => {
      console.log(err);
      this.loading = false;
      this.error = true;
    });
  }

  navegarACrearLibro(): void {
    this.router.navigate(["libros", "nuevo"]);
  }

  navegarAEditarLibro(idLibro: string): void {
    this.router.navigate(["libros", "editar", idLibro]);
  }

  comprarLibro(libro: any): void {
    const modal = this.modalService.open(ConfirmActionModalComponent);
    modal.componentInstance.title = "Comprar Libro";
    modal.componentInstance.description = `¿Estas seguro que quieres comprar "${libro.titulo}" por el precio de ${this.currencyPipe.transform(libro.precio_compra, "Q")}`;
    modal.result.then(result => {
      const compraLibro = {
        id_usuario: this.authService.user["id_usuario"],
        id_libro: libro.id_libro
      };
      this.pagesService.comprarLibro(compraLibro).subscribe(resp => {
        console.log(resp);
        this.router.navigate(["biblioteca"]);
      }, err => {
        console.log(err);
      });
    }, dismiss => {});
  }

  rentarLibro(libro: any): void {
    const modal = this.modalService.open(AlquilarLibroComponent, { size: "md" });
    modal.componentInstance.tituloLibro = libro.titulo;

    modal.result.then(result => {
      const rentaBody = {
        id_usuario: this.authService.user["id_usuario"],
        id_libro: libro.id_libro,
        fecha_devolucion: result
      };
      this.pagesService.rentarLibro(rentaBody).subscribe(resp => {
        console.log(resp);
        this.router.navigate(["biblioteca"])
      }, err => {
        console.log(err);
      });
    }, dismiss => {});

  }
}

