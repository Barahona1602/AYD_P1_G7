import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  
  showAlert: boolean = false;
  alertMessage: string = ""

  passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;

  registerForm: FormGroup = this.fb.group({
    nombre: [null, [Validators.required]],
    apellido: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    fechaNacimiento: [null, [Validators.required]],
    correo: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
    passwordRepeat: [null, [Validators.required]],
  });

  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {}

  get notValidNombre(): boolean {
    return this.registerForm.get("nombre").touched && this.registerForm.get("nombre").invalid;
  }
  get notValidApellido(): boolean {
    return this.registerForm.get("apellido").touched && this.registerForm.get("apellido").invalid;
  }
  get notValidTelefono(): boolean {
    return this.registerForm.get("telefono").touched && this.registerForm.get("telefono").invalid;
  }
  get notValidFechaNacimiento(): boolean {
    return this.registerForm.get("fechaNacimiento").touched && this.registerForm.get("fechaNacimiento").invalid;
  }
  get notValidCorreo(): boolean {
    return this.registerForm.get("correo").touched && this.registerForm.get("correo").invalid;
  }
  get notValidPassword(): boolean {
    return this.registerForm.get("password").touched && this.registerForm.get("password").invalid;
  }
  get notValidPasswordRepeat(): boolean {
    if (this.registerForm.get("passwordRepeat").touched && this.registerForm.get("passwordRepeat").invalid) {
      return true;
    }
    return this.registerForm.get("passwordRepeat").value !== this.registerForm.get("password").value;
  }

  register(): void {
    this.showAlert = false;
    if (this.registerForm.invalid) {
      return;
    }
    this.registerForm.disable();
    const registerBody = {
      nombre: this.registerForm.get("nombre").value,
      apellido: this.registerForm.get("apellido").value,
      telefono: this.registerForm.get("telefono").value,
      correo: this.registerForm.get("correo").value,
      fechaNacimiento: this.registerForm.get("fechaNacimiento").value,
      contraseña: this.registerForm.get("password").value,
    };

    this.authService.register(registerBody).pipe(take(1)).subscribe(resp => {
      console.log(resp);
      this.router.navigate(["auth", "login"]);
    }, err => {
      console.log(err);
      this.showAlert = true;
      this.alertMessage = err.error.mensaje ?? "Algo salió mal.";
      this.registerForm.enable();
    });
  }
}
