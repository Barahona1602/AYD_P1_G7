import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagesService } from '../pages.service';
import { AuthService } from 'src/app/auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlquilarLibroComponent } from 'src/app/modals/alquilar-libro/alquilar-libro.component';

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
    private modalService: NgbModal
  ) {}
  
  ngOnInit(): void {
    this.getLibros();
  }

  getLibros(): void {
    this.loading = true;
    this.pagesService.getLibros().subscribe(resp => {
      console.log(resp);
      this.libros = resp.libros;
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

  comprarLibro(idLibro: string): void {

  }

  rentarLibro(libro: any): void {
    const modal = this.modalService.open(AlquilarLibroComponent, { size: "md" });
    modal.componentInstance.tituloLibro = libro.titulo;

    modal.result.then(result => {
      console.log(result);
    }, dismiss => {});

  }
}

