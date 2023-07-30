import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { FilterRequest } from '../models/filter-request.model';
import { FilterResponse } from '../models/filter-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: string = "https://localhost:7292/api/Usuario/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Usuario[]> {
    let token = sessionStorage.getItem("token");
    const headers = { 'Authorization': `Bearer ${token}` }
    return this._http.get<Usuario[]>(this.url, { headers });
  }

  getById(usuarioId: number): Observable<Usuario> {
    return this._http.get<Usuario>(`${this.url}${usuarioId}`);
  }

  create(request: Usuario): Observable<Usuario> {
    return this._http.post<Usuario>(this.url, request);
  }
  update(request: Usuario): Observable<Usuario> {
    return this._http.put<Usuario>(this.url, request);
  }
  delete(usuarioId: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${usuarioId}`);
  }

  buscarPorFiltro(filtro: FilterRequest): Observable<FilterResponse<Usuario>> {
    return this._http.post<FilterResponse<Usuario>>(`${this.url}filtro`, filtro);
  }

  /*
    NET FRAMEWORK
      PUT ==> 2
        logica de negocio
          1 ==> getByid (2)
          2 ==> update ==> en base al resultado del paso 1
          retorno de la actualización
    NET CORE ==> YA NO ES NECESARIO PUT (con el objeto completo)
  */
}
