import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as globals from '../../globals';

export const API = "compra";

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  constructor(private _http: HttpClient) { }

  getList(): Observable<any>{
    return this._http.get(globals.API_URL + API);
  }

  add(data: any): Observable<any>{
    data.dataHora = '0001-01-01T00:00:00';
    return this._http.post(globals.API_URL + API, data);
  }

  update(id: number, data: any): Observable<any>{
    data.id = id;
    data.dataHora = '0001-01-01T00:00:00';
    return this._http.put(globals.API_URL + API + `/${id}`, data);
  }

  delete(id: number): Observable<any>{
    return this._http.delete(globals.API_URL + API + `/${id}`);
  }
}
