import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';
import { VistaProveedor } from '../models/VistaProveedor';
import { FilterRequest } from '../models/filter-request.model';
import { FilterResponse } from '../models/filter-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  url: string = "https://localhost:7292/api/Proveedor/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<VistaProveedor[]> {
    return this._http.get<VistaProveedor[]>(this.url);
  }

  getById(proveedorId: number): Observable<Proveedor> {
    return this._http.get<Proveedor>(`${this.url}${proveedorId}`);
  }

  create(request: Proveedor): Observable<Proveedor> {
    return this._http.post<Proveedor>(this.url, request);
  }
  update(request: Proveedor): Observable<Proveedor> {
    return this._http.put<Proveedor>(this.url, request);
  }
  delete(proveedorId: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${proveedorId}`);
  }

  buscarPorFiltro(filtro: FilterRequest): Observable<FilterResponse<VistaProveedor>> {
    return this._http.post<FilterResponse<VistaProveedor>>(`${this.url}filtro`, filtro);
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
