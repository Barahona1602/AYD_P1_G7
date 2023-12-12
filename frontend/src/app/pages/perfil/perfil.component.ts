import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { PagesService } from '../pages.service';
import * as moment from "moment";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  
  loading: boolean = false;
  showAlert: boolean = false;
  error: boolean = false;

  alertMessage: string = "";

  usuario: any;
  usuarioForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private pagesService: PagesService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
  }

  getUsuario(): void {
    this.loading = true;
    this.pagesService.getUsuario(this.authService.user["id_usuario"]).subscribe(resp => {
      console.log(resp);
      this.usuario = resp.usuario;
      this.crearFormulario();
    }, err => {
      console.log(err);
    });
  }

  crearFormulario(): void {
    this.usuarioForm = this.fb.group({
      nombre: [this.usuario.nombre, [Validators.required]],
      apellido: [this.usuario.apellido, [Validators.required]],
      correo: [this.usuario.correo, [Validators.required]],
      fechaNacimiento: [String(moment(this.usuario.fecha_nac).format("MM/DD/yyyy")), [Validators.required]],
      telefono: [this.usuario.numero_tel, [Validators.required]],
      password: [this.usuario.password, [Validators.required]],
    });
    this.loading = false;
  }

  saveUser(): void {
    if (this.usuarioForm.invalid) {
      return;
    }
    this.usuarioForm.disable();
    this.showAlert = false;
    this.error = false;
    const usuarioBody = {
      nombre: this.usuarioForm.get("nombre").value,
      apellido: this.usuarioForm.get("apellido").value,
      numero_tel: this.usuarioForm.get("telefono").value,
      correo: this.usuarioForm.get("correo").value,
      password: this.usuarioForm.get("password").value,
      fecha_nac: moment(this.usuarioForm.get("fechaNacimiento").value).format("yyyy/MM/DD")
    };
    this.pagesService.updateUsuario(this.usuario.id_usuario, usuarioBody).subscribe(resp => {
      this.usuarioForm.enable();
      console.log(resp);
    }, err => {
      console.log(err);
      this.showAlert = true;
      this.alertMessage = err.error.mensaje ?? "Algo salio mal.";
      this.usuarioForm.enable();
    });
  }
}
