import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { PagesRoutingModule } from "./pages-routing.module";

@NgModule({
  declarations: [HomeComponent],
  providers: [],
  imports: [PagesRoutingModule],
  exports: []
})
export class PagesModule { }