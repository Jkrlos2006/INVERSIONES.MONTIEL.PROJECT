import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Egreso } from '../models/egreso';
import { VistaEgreso } from '../models/VistaEgreso';
import { FilterRequest } from '../models/filter-request.model';
import { FilterResponse } from '../models/filter-response.model';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  url: string = "https://localhost:7292/api/Egreso/";

  constructor(

    private _http: HttpClient

  ) { }

  getAll(): Observable<VistaEgreso[]> {
    return this._http.get<VistaEgreso[]>(this.url);
  }

  getById(salidaId: number): Observable<Egreso> {
    return this._http.get<Egreso>(`${this.url}${salidaId}`);
  }

  create(request: Egreso): Observable<Egreso> {
    return this._http.post<Egreso>(this.url, request);
  }
  update(request: Egreso): Observable<Egreso> {
    return this._http.put<Egreso>(this.url, request);
  }
  delete(salidaId: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${salidaId}`);
  }

  buscarPorFiltro(filtro: FilterRequest): Observable<FilterResponse<VistaEgreso>> {
    return this._http.post<FilterResponse<VistaEgreso>>(`${this.url}filtro`, filtro);
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
