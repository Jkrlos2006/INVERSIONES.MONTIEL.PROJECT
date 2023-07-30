import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingreso } from '../models/ingreso';
import { VistaIngreso } from '../models/VistaIngreso';
import { FilterRequest } from '../models/filter-request.model';
import { FilterResponse } from '../models/filter-response.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  url:string = "https://localhost:7292/api/Ingreso/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll():Observable<VistaIngreso[]>
  {
    return this._http.get<VistaIngreso[]>(this.url);
  }

  getById(ingresoId:number):Observable<Ingreso>
  {
    return this._http.get<Ingreso>(`${this.url}${ingresoId}`);
  }

  create(request:Ingreso):Observable<Ingreso>
  {
    return this._http.post<Ingreso>(this.url, request);
  }

  update(request:Ingreso):Observable<Ingreso>
  {
    return this._http.put<Ingreso>(this.url, request);
  }

  delete(ingresoId:number):Observable<number>
  {
    return this._http.delete<number>(`${this.url}${ingresoId}`);
  }

  buscarPorFiltro(filtro: FilterRequest): Observable<FilterResponse<VistaIngreso>> {
    return this._http.post<FilterResponse<VistaIngreso>>(`${this.url}filtro`, filtro);
  }
  
}
