import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThingsOperations } from './things-operations';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';

export abstract class ThingsService<T, ID> implements ThingsOperations<T, ID> {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private fullUrl: string;
  
  constructor(
    protected _http: HttpClient,
    protected _base: string,
    protected _thingType: string
  ) { 
    this.fullUrl = _base + _thingType;
  }
  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this.fullUrl)
  }
  getOneById(id: ID): Observable<T> {
    return this._http.get<T>(this.fullUrl + id);
  }
  create(t: T): Observable<T> {
    return this._http.post<T>(this.fullUrl, JSON.stringify(t), this.httpOptions);
  }
  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this.fullUrl + id, JSON.stringify(t), this.httpOptions);
  }
  delete(id: ID): Observable<any> {
    return this._http.delete<T>(this.fullUrl + id);
  }
  uploadImage(formData: FormData): Observable<any> {
    return this._http.post<T>(this.fullUrl + 'uploadImage', formData, {reportProgress: true, observe: 'events'});
  }
  // getImage(serverPath: string): Observable<any> {
  //   var asd = this._base + serverPath;
  //   return this._http.get<T>(this._base + serverPath)
  // }
}
