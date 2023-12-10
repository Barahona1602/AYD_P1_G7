import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AuthRoutingModule } from "./auth-routing.module";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  providers: [
    AuthService
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [],
})
export class AuthModule {}
