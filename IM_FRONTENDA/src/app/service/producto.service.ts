import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { FilterRequest } from '../models/filter-request.model';
import { FilterResponse } from '../models/filter-response.model';
import { VistaProveedor } from '../models/VistaProveedor';
import { ConstanteFiltroProveedor } from 'src/app/constantes/constante-filtro';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { ExportExcelService } from 'src/app/service/export-excel.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: string = "https://localhost:7292/api/Producto/";
  constructor(
    private _http: HttpClient
  ) { }

  getAll(): Observable<Producto[]> {
    return this._http.get<Producto[]>(this.url);
  }

  getById(codigoId: number): Observable<Producto> {
    return this._http.get<Producto>(`${this.url}${codigoId}`);
  }

  create(request: Producto): Observable<Producto> {
    return this._http.post<Producto>(this.url, request);
  }
  update(request: Producto): Observable<Producto> {
    return this._http.put<Producto>(this.url, request);
  }
  delete(codigoId: number): Observable<number> {
    return this._http.delete<number>(`${this.url}${codigoId}`);
  }


  buscarPorFiltro(filtro: FilterRequest): Observable<FilterResponse<Producto>> {
    return this._http.post<FilterResponse<Producto>>(`${this.url}filtro`, filtro);
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
