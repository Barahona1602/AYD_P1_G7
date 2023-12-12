import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LibroComponent } from "./libro/libro.component";
import { LibrosComponent } from "./libros/libros.component";
import { BibliotecaComponent } from "./biblioteca/biblioteca.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { CrearLibroComponent } from "./libros/crear-libro/crear-libro.component";
import { EditarLibroComponent } from "./libros/editar-libro/editar-libro.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "libros", component: LibrosComponent },
  { path: "libros/nuevo", component: CrearLibroComponent },
  { path: "libros/editar/:idLibro", component: EditarLibroComponent },
  { path: "libros/:idLibro", component: LibroComponent },
  { path: "biblioteca", component: BibliotecaComponent },
  { path: "usuarios", component: UsuariosComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }