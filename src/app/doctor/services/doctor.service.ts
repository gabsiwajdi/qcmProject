import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  creerSubject(model: any) {
    return this.http.post(environment.baseApi + 'subjects', model);
  }

  sdeleteSubject(model: any, id: number) {
    return this.http.put(environment.baseApi + 'subjects/' + id, model);
  }
}