import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { LibrosComponent } from './libros/libros.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LibroComponent } from './libro/libro.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { LibroFormComponent } from './libros/libro-form/libro-form.component';
import { CrearLibroComponent } from './libros/crear-libro/crear-libro.component';
import { EditarLibroComponent } from './libros/editar-libro/editar-libro.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { PagesService } from "./pages.service";

@NgModule({
  declarations: [HomeComponent, LibrosComponent, PerfilComponent, LibroComponent, BibliotecaComponent, LibroFormComponent, CrearLibroComponent, EditarLibroComponent],
  providers: [PagesService],
  imports: [CommonModule, PagesRoutingModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  exports: []
})
export class PagesModule { }