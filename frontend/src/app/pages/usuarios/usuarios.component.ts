import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit{
  loading: boolean = false;
  error: boolean = false;
  usuarios: any[] = [];
  
  constructor(private pagesService: PagesService) {}

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
    this.pagesService.deleteUsuario(idUsuario).subscribe(resp => {
      console.log(resp);
      
    }, err => {
      console.log(err);
    });
  }
}
