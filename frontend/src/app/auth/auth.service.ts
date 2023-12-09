import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthService {
  private serverUrl = "http://localhost:3000"
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  get token(): string {
    return localStorage.getItem("token");
  }

  register(registerBody: any): Observable<any> {
    return this.httpClient.post(`${this.serverUrl}/registrarUsuario`, registerBody);
  }

  getHello(): Observable<any> {
    return this.httpClient.get(`${this.serverUrl}/`);
  }

  saveToken(token: string): void {
    localStorage.setItem("token", token);
  }

  logOut(): void {
    localStorage.removeItem("token");
    this.router.navigate(["login"]);
  }

}
