import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService {
  serverUrl = "http://localhost:3000"
  constructor(private httpClient: HttpClient) {}

  register(registerBody: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/RegistrarUsuario`, registerBody);
  }
}
