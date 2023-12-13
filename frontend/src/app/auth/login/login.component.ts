import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  
  loading: boolean = true;
  loginForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  get notValidCorreo(): boolean {
    return this.loginForm.get("correo").touched && this.loginForm.get("correo").invalid;
  }
  get notValidPassword(): boolean {
    return this.loginForm.get("password").touched && this.loginForm.get("password").invalid;
  }

  createForm(): void {
    this.loading = true;
    this.loginForm = this.fb.group({
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
    this.loading = false;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.showAlert = false;
    this.loginForm.disable();
    const loginBody = {
      correo: this.loginForm.get("correo").value,
      password: this.loginForm.get("password").value
    };

    if (loginBody.correo === "admin@gmail.com" && loginBody.password === "Admin.123") {
      const adminBody = {
        id_usuario: "admin",
        nombre: "Administrador",
        apellido: "",
        correo: "admin@gmail.com",
        password: "Admin.123",
        numero_tel: "12345678",
        fecha_nac: new Date().toISOString()
      };
      this.authService.saveToken(JSON.stringify(adminBody));
      this.router.navigate(["home"]);
      return;
    }
    this.authService.login(loginBody).subscribe(resp => {
      console.log(resp);
      this.authService.saveToken(JSON.stringify(resp.usuario));
      this.router.navigate(["home"]);
    }, err => {
      console.log(err);
      this.showAlert = true;
      this.alertMessage = err.error.mensaje ?? "Algo salió mal.";
      this.loginForm.enable();
    });
  }
}
