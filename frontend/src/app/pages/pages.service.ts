import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

enum RequestMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private serverUrl: string = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  private request(method: RequestMethod, url: string, body?: any, params?: any): Observable<any> {
    const requestUrl = `${this.serverUrl}/${url}`;
    let requestObservable: Observable<any>;
    switch (method) {
      case RequestMethod.GET:
      requestObservable = this.httpClient.get(requestUrl, { params });
      break;
      case RequestMethod.POST:
      requestObservable = this.httpClient.post(requestUrl, body, { params });  
      break;
      case RequestMethod.PUT:
      requestObservable = this.httpClient.put(requestUrl, body, { params });  
      break;
      case RequestMethod.PATCH:
      requestObservable = this.httpClient.patch(requestUrl, body, { params });  
      break;
      case RequestMethod.DELETE:
      requestObservable = this.httpClient.delete(requestUrl, { params });  
      break;
    }
    return requestObservable;
  }

  createLibro(libroBody: any): Observable<any> {
    return this.request(RequestMethod.POST, "agregarLibro", libroBody);
  }

  getLibros(): Observable<any> {
    return this.request(RequestMethod.GET, "libros");
  }

  getLibro(idLibro: string): Observable<any> {
    return this.request(RequestMethod.GET, `libros/${idLibro}`);
  }

  updateLibro(idLibro: string, libroBody: any): Observable<any> {
    return this.request(RequestMethod.PUT, `actualizarLibro/${idLibro}`, libroBody);
  }

  deleteLibro(idLibro: string): Observable<any> {
    return this.request(RequestMethod.DELETE, `eliminarLibro/${idLibro}`);
  }

  getUsuarios(): Observable<any> {
    return this.request(RequestMethod.GET, "usuarios");
  }

  deleteUsuario(idUsuario: string): Observable<any> {
    return this.request(RequestMethod.DELETE, `eliminarUsuario/${idUsuario}`);
  }

  getUsuario(idUsuario: string): Observable<any> {
    return this.request(RequestMethod.GET, `usuarios/${idUsuario}`);
  }

  updateUsuario(idUsuario: string, usuario: any): Observable<any> {
    return this.request(RequestMethod.PUT, `editarUsuario/${idUsuario}`, usuario);
  }

  rentarLibro(rentarBody: any): Observable<any> {
    return this.request(RequestMethod.POST, "rentarLibro", rentarBody);
  }

  comprarLibro(compraBody: any): Observable<any> {
    return this.request(RequestMethod.POST, "venderLibro", compraBody);
  }

  getLibrosCompradosDeUsuario(idUsuario: string): Observable<any> {
    return this.request(RequestMethod.GET, `ventas/usuario/${idUsuario}`);
  }

  getLibrosRentadosDeUsuario(idUsuario: string): Observable<any> {
    return this.request(RequestMethod.GET, `rentas/usuario/${idUsuario}`);
  }

  devolverLibro(libroId: string, body: any): Observable<any> {
    return this.request(RequestMethod.POST, `devolverLibro/${libroId}`, body);
  }

  getComentarios(idLibro: string): Observable<any> {
    return this.request(RequestMethod.GET, `libros/${idLibro}/comentarios`);
  }

  publicarComentario(idUsuario: string, idLibro: string, comentarioBody: any): Observable<any> {
    return this.request(RequestMethod.POST, `comentarLibro/${idUsuario}/${idLibro}`, comentarioBody);
  }

  eliminarComentario(idUsuario: number, idLibro: number, idComentario: number): Observable<any> {
    return this.request(RequestMethod.DELETE, `eliminarComentario/${idUsuario}/${idLibro}/${idComentario}`);
  }
}
