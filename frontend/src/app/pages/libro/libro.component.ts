import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Location } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionModalComponent } from 'src/app/modals/confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.scss']
})
export class LibroComponent implements OnInit {
  
  loading: boolean = false;
  libro: any;
  showComentarioInput: boolean = false;
  nuevoComentario: string = "";
  comentarios: any[] = []

  constructor(
    private pagesService: PagesService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    public location: Location,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getLibro();
  }

  getLibro(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.pagesService.getLibro(params["idLibro"]).subscribe(resp => {
        console.log(resp);
        this.libro = resp.libro;
        this.getComentarios();
      });
    });
  }

  getComentarios(): void {
    this.loading = true;
    this.pagesService.getComentarios(this.libro.id_libro).subscribe(resp => {
      console.log(resp);
      this.comentarios = resp.comentarios;
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }

  publicarComentario(): void {
    if (this.nuevoComentario.length === 0) {
      return;
    }
    const comentario = {
      comentario: this.nuevoComentario
    };

    this.pagesService.publicarComentario(this.authService.user["id_usuario"], this.libro.id_libro, comentario).subscribe(resp => {
      this.nuevoComentario = "";
      this.showComentarioInput = false;
      console.log(resp);
      this.getComentarios();
    }, err => {
      console.log(err);
    });
  }

  eliminarComentario(idComentario: number): void {
    const modal = this.modalService.open(ConfirmActionModalComponent);
    modal.componentInstance.title = "Eliminar Comentario";
    modal.componentInstance.description = "Estas seguro que quieres eliminar tu comentario?";
    modal.result.then(result => {
      this.pagesService.eliminarComentario(this.authService.user["id_usuario"], this.libro.id_libro, idComentario).subscribe(resp => {
        this.getComentarios();
      }, err => {
        console.log(err);
      });
    }, dismiss => {})
  }
}
