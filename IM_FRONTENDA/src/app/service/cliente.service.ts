import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { VistaCliente } from '../models/VistaCliente';
import { FilterRequest } from '../models/filter-request.model';
import { FilterResponse } from '../models/filter-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = "https://localhost:7292/api/Cliente/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<VistaCliente[]> {
    return this._http.get<VistaCliente[]>(this.url);
  }

  getById(clienteId: number): Observable<Cliente> {
    return this._http.get<Cliente>(`${this.url}${clienteId}`);
  }

  create(request: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(this.url, request);
  }
  update(request: Cliente): Observable<Cliente> {
    return this._http.put<Cliente>(this.url, request);
  }
  delete(clienteId: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${clienteId}`);
  }


  buscarPorFiltro(filtro: FilterRequest): Observable<FilterResponse<VistaCliente>> {
    return this._http.post<FilterResponse<VistaCliente>>(`${this.url}filtro`, filtro);
  }

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
