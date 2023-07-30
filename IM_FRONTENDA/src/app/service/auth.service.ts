import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url: string = "https://localhost:7292/api/auth/";
  constructor(
    private _http: HttpClient
  ) { }


  login(request: any): Observable<any> {
    return this._http.post<any>(this.url, request);
  }


}
