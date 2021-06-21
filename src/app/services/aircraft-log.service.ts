import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Response } from '../common/response.model';
import { AircraftLogVM } from '../models/aircraft-log.model';

@Injectable({
  providedIn: 'root'
})
export class AircraftLogService {

  apiPath?: string;

  constructor(
    private http: HttpClient
  ) { 
    this.apiPath = environment.apiBase;
  }

  getAircraftLogs() : Observable<Response<AircraftLogVM>>
  {
    return this.http.get<Response<AircraftLogVM>>(this.apiPath + 'AircraftLog/aircraft-logs');
  }

  getFilteredAircraftLogs(make: string, model: string, registration: string) : Observable<Response<AircraftLogVM>>
  {
    return this.http.get<Response<AircraftLogVM>>(this.apiPath + 'AircraftLog/filter-aircraft-logs', {
      params: new HttpParams()
      .set('make', make)
      .set('model', model)
      .set('registration', registration)
    });
  }

  getAircraftLog(id: number): Observable<Response<AircraftLogVM>> {
    return this.http.get<Response<AircraftLogVM>>(this.apiPath + 'AircraftLog/by-id/' + id);
  }

  saveAircraftLog(formData: AircraftLogVM): Observable<Response<AircraftLogVM>> {
    return this.http.post<Response<AircraftLogVM>>(this.apiPath + 'AircraftLog/insert', formData);
  }

  updateAircraftLog(formData: AircraftLogVM): Observable<Response<AircraftLogVM>> {
    return this.http.put<Response<AircraftLogVM>>(this.apiPath + 'AircraftLog/update', formData);
  }

  deleteAircraftLog(id: number): Observable<Response<AircraftLogVM>> {
    return this.http.delete<Response<AircraftLogVM>>(this.apiPath + 'AircraftLog/delete/' + id);
  }
}
