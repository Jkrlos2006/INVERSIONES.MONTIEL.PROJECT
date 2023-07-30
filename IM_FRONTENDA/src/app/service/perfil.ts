import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  url:string = "https://localhost:7292/api/Perfil/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll():Observable<Perfil[]>
  {
    return this._http.get<Perfil[]>(this.url);
  }

  getById(perfilId:number):Observable<Perfil>
  {
    return this._http.get<Perfil>(`${this.url}${perfilId}`);
  }

  create(request:Perfil):Observable<Perfil>
  {
    return this._http.post<Perfil>(this.url, request);
  }

  update(request:Perfil):Observable<Perfil>
  {
    return this._http.put<Perfil>(this.url, request);
  }

  delete(perfilId:number):Observable<number>
  {
    return this._http.delete<number>(`${this.url}${perfilId}`);
  }
}
