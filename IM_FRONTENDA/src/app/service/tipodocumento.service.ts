import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipodocumento } from '../models/tipodocumento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  url: string = "https://localhost:7292/api/TipoDocumento/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Tipodocumento[]> {
    return this._http.get<Tipodocumento[]>(this.url);
  }

  getById(documentoId: number): Observable<Tipodocumento> {
    return this._http.get<Tipodocumento>(`${this.url}${documentoId}`);
  }

  create(request: Tipodocumento): Observable<Tipodocumento> {
    return this._http.post<Tipodocumento>(this.url, request);
  }
  update(request: Tipodocumento): Observable<Tipodocumento> {
    return this._http.put<Tipodocumento>(this.url, request);
  }
  delete(documentoId: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${documentoId}`);
  }
}