import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoComprobante } from '../models/tipocomprobante';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {

  url: string = "https://localhost:7292/api/TipoComprobante/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<TipoComprobante[]> {
    return this._http.get<TipoComprobante[]>(this.url);
  }

  getById(comprobanteId: number): Observable<TipoComprobante> {
    return this._http.get<TipoComprobante>(`${this.url}${comprobanteId}`);
  }

  create(request: TipoComprobante): Observable<TipoComprobante> {
    return this._http.post<TipoComprobante>(this.url, request);
  }
  update(request: TipoComprobante): Observable<TipoComprobante> {
    return this._http.put<TipoComprobante>(this.url, request);
  }
  delete(comprobanteId: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${comprobanteId}`);
  }
}