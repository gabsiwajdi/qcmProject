import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

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

  getStudentById(id: number) {
    return this.http.get(environment.baseApi + 'students/' + id);
  }

  // pour la partie autorisation
  getRole() {
    return this.http.get(environment.baseApi + 'login/1');
  }

  updateStudent(id: number, model: any) {
    return this.http.put(environment.baseApi + 'students/' + id, model).pipe(
      catchError((error) => {
        console.error("Erreur lors de la mise à jour de l'étudiant :", error);
        throw error; // Rejeter l'erreur pour la traiter à un niveau supérieur si nécessaire
      })
    );
  }
}
