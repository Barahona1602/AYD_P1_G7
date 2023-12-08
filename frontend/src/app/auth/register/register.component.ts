import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup | undefined;

  passwordRegex = /^(?=.*[A-Z])(?=.*[\W])(?=.*[0-9])(?=.*[a-z]).{8,128}$/;
  
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      nombre: [null, [Validators.required]],
      apellido: [null, [Validators.required]],
      telefono: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      correo: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(this.passwordRegex)]],
      passwordRepeat: [null, [Validators.required]],
    });
  }
}
