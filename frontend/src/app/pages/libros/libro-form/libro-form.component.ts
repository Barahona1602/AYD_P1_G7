import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagesService } from '../../pages.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmActionModalComponent } from 'src/app/modals/confirm-action-modal/confirm-action-modal.component';

@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.scss']
})
export class LibroFormComponent implements OnInit {
  @Input() isNew: boolean;
  libro: any;

  libroForm: FormGroup;
  loading: boolean = true;
  showAlert: boolean = false;
  alertMessage: string = "";
  
  lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus corrupti modi aliquid nisi vero nobis libero eveniet cum perspiciatis harum. Placeat, at. Iste, corrupti et. Aut sapiente non consequuntur. Ea. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus corrupti modi aliquid nisi vero nobis libero eveniet cum perspiciatis harum. Placeat, at. Iste, corrupti et. Aut sapiente non consequuntur. Ea."


  constructor(
    private fb: FormBuilder,
    private pagesService: PagesService,
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalSerice: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.isNew) {
      this.crearFormulario();
    } else {
      this.getLibro();
    }
  }

  get notValidTitulo(): boolean {
    return this.libroForm.get("titulo").touched && this.libroForm.get("titulo").invalid;
  }
  get notValidSinopsis(): boolean {
    return this.libroForm.get("sinopsis").touched && this.libroForm.get("sinopsis").invalid;
  }
  get notValidPrecioCompra(): boolean {
    return this.libroForm.get("precioCompra").touched && this.libroForm.get("precioCompra").invalid;
  }
  get notValidPrecioRenta(): boolean {
    return this.libroForm.get("precioRenta").touched && this.libroForm.get("precioRenta").invalid;
  }
  get notValidAutor(): boolean {
    return this.libroForm.get("autor").touched && this.libroForm.get("autor").invalid;
  }
  get notValidPublicacion(): boolean {
    return this.libroForm.get("publicacion").touched && this.libroForm.get("publicacion").invalid;
  }
  get notValidEditorial(): boolean {
    return this.libroForm.get("editorial").touched && this.libroForm.get("editorial").invalid;
  }
  get notValidEstado(): boolean {
    return this.libroForm.get("estado").touched && this.libroForm.get("estado").invalid;
  }

  getLibro(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      const idLibro = params["idLibro"];
      this.pagesService.getLibro(idLibro).subscribe(resp => {
        this.libro = resp.libro;
        console.log(this.libro);
        this.crearFormulario();
      });
    });
  }

  private crearFormulario(): void {
    this.loading = true;
    this.libroForm = this.fb.group({
      titulo: [this.isNew ? null : this.libro.titulo, [Validators.required]],
      sinopsis: [this.isNew ? null : this.libro.sinopsis, [Validators.required]],
      precioCompra: [this.isNew ? null : this.libro.precio_compra, [Validators.required]],
      precioRenta: [this.isNew ? null : this.libro.precio_renta, [Validators.required]],
      autor: [this.isNew ? null : this.libro.autor, [Validators.required]],
      publicacion: [this.isNew ? null : this.libro["año_publicacion"], [Validators.required]],
      editorial: [this.isNew ? null : this.libro.editorial, [Validators.required]],
      estado: [true, [Validators.required]],
    });
    this.loading = false;
  }

  crearLibro(): void {
    if (this.libroForm.invalid) {
      return;
    }
    this.showAlert = false;
    this.libroForm.disable();
    const libroBody = {
      sinopsis: this.libroForm.get("sinopsis").value,
      precioCompra: this.libroForm.get("precioCompra").value,
      precioRenta: this.libroForm.get("precioRenta").value,
      autor: this.libroForm.get("autor").value,
      anoPublicacion: this.libroForm.get("publicacion").value,
      editorial: this.libroForm.get("editorial").value,
      estado: this.libroForm.get("estado").value ? "Disponible" : "Ocupado",
      titulo: this.libroForm.get("titulo").value
    };
    if (this.isNew) {
      this.pagesService.createLibro(libroBody).subscribe(resp => {
        console.log(resp);
        this.libroForm.enable();
        this.router.navigate(["libros"]);
      }, err => {
        console.log(err);
        this.libroForm.enable();
        this.alertMessage = err.error.mensaje ?? "Algo salió mal";
        this.showAlert = true;
      });
    } else {
      this.pagesService.updateLibro(this.libro.id_libro, libroBody).subscribe(resp => {
        console.log(resp);
        this.libroForm.enable();
        this.router.navigate(["libros"]);
      }, err => {
        console.log(err);
        this.libroForm.enable();
        this.alertMessage = err.error.mensaje ?? "Algo salió mal";
        this.showAlert = true;
      });
    }
  }

  eliminarLibro(): void {
    const modal = this.modalSerice.open(ConfirmActionModalComponent);
    modal.componentInstance.title = "Eliminar Libro";
    modal.componentInstance.description = "Estas seguro de que quieres eliminar el libro?";
    modal.result.then(result => {
      this.libroForm.disable();
      this.pagesService.deleteLibro(this.libro.id_libro).subscribe(resp => {
        console.log(resp);
        this.router.navigate(["libros"]);
      }, err => {
        console.log(err);
        this.libroForm.enable();
        this.alertMessage = err.error.mensaje ?? "Algo salió mal";
        this.showAlert = true;
      });
    }, dismiss => {});
  }

  atras(): void {
    this.location.back();
  }

}
