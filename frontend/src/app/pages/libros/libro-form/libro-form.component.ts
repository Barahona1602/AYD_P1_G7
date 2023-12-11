import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagesService } from '../../pages.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-libro-form',
  templateUrl: './libro-form.component.html',
  styleUrls: ['./libro-form.component.scss']
})
export class LibroFormComponent implements OnInit {
  @Input() isNew: boolean;
  
  libroForm: FormGroup;
  loading: boolean = true;
  showAlert: boolean = false;
  alertMessage: string = "";
  
  lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus corrupti modi aliquid nisi vero nobis libero eveniet cum perspiciatis harum. Placeat, at. Iste, corrupti et. Aut sapiente non consequuntur. Ea. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus corrupti modi aliquid nisi vero nobis libero eveniet cum perspiciatis harum. Placeat, at. Iste, corrupti et. Aut sapiente non consequuntur. Ea."


  constructor(
    private fb: FormBuilder,
    private pagesService: PagesService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.crearFormulario();
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

  private crearFormulario(): void {
    this.loading = true;
    this.libroForm = this.fb.group({
      titulo: [null, [Validators.required]],
      sinopsis: [this.lorem, [Validators.required]],
      precioCompra: [null, [Validators.required]],
      precioRenta: [null, [Validators.required]],
      autor: [null, [Validators.required]],
      publicacion: [null, [Validators.required]],
      editorial: [null, [Validators.required]],
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
      anoPublicacion: new Date(this.libroForm.get("publicacion").value).getFullYear(),
      editorial: this.libroForm.get("editorial").value,
      estado: this.libroForm.get("estado").value,
      titulo: this.libroForm.get("titulo").value
    };
    this.pagesService.createLibro(libroBody).subscribe(resp => {
      this.libroForm.enable();
      console.log(resp);
    }, err => {
      console.log(err);
      this.libroForm.enable();
      this.alertMessage = err.error.mensaje ?? "Algo salió mal";
      this.showAlert = true;
    });
  }

  atras(): void {
    this.location.back();
  }

}
