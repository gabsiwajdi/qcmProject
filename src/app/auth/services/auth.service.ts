import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user = new Subject(); // subject travaille comme observable

  createUser(model: any) {
    return this.http.post(environment.baseApi + 'students', model);
  }

  getAllStudents(type: string) {
    return this.http.get(environment.baseApi + type); // type peut etre students ou doctor
  }

  login(model: any) {
    return this.http.put(environment.baseApi + 'login/1', model);
  }

  // pour la partie autorisation
  getRole() {
    return this.http.get(environment.baseApi + 'login/1');
  }
}
