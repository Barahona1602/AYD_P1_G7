import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';
import { AuthService } from '../../auth/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionModalComponent } from 'src/app/modals/confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{
  loading: boolean = false;
  error: boolean = false;
  usuarios: any[] = [];
  
  constructor(
    private pagesService: PagesService,
    public authService: AuthService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(): void {
    this.loading = true;
    this.pagesService.getUsuarios().subscribe(resp => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.error = false;
      this.loading = false;
    }, err => {
      console.log(err);
      this.error = true;
      this.loading = false;
    })
  }

  eliminarUsuario(idUsuario: string): void {
    const modal = this.modalService.open(ConfirmActionModalComponent);
    modal.componentInstance.title = "Eliminar Usuario";
    modal.componentInstance.description = "¿Estas seguro que quieres eliminar este usuario?";
    modal.result.then(result => {
      this.pagesService.deleteUsuario(idUsuario).subscribe(resp => {
        console.log(resp);
        this.getUsuarios();
      }, err => {
        console.log(err);
      });
    }, dismiss => {});
  }
}
