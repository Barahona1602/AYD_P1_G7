import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./auth-routing.module";
import { RegisterComponent } from "./register/register.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    RegisterComponent
  ],
  providers: [],
  imports: [
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
})
export class AuthModule {}
