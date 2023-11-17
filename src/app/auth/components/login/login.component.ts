import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  users: any[] = [];
  loginForm!: FormGroup;
  type: string = 'students';
  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.creerForm();
  }
  // creer la formulaire d login
  creerForm() {
    this.loginForm = this.fb.group({
      type: [this.type],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  //recuperer la liste des useres celon leur type (etudient ou doctor )
  getUsers() {
    this.service.getAllStudents(this.type).subscribe((res: any) => {
      this.users = res;
      console.log(this.users);
    });
  }
  // recupere le role de utilisateur (celon la button radio selectionner)
  getRole(event: any) {
    this.type = event.value;
    this.getUsers();
  }

  submit() {
    let index = this.users.findIndex(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );
    if (index == -1) {
      Swal.fire({
        icon: 'error',
        text: 'E-mail ou Password invalid !',
      });
    } else {
      const model = {
        userName: this.users[index].userName,
        role: this.type,
      };
      this.service.login(model).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          text: 'Binevenu !',
        });
      });
      this.router.navigate(['/subjects']);
    }
  }
}
