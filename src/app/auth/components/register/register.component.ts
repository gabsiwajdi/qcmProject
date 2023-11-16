import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  students: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllStudents();
    this.creerForm();
  }

  creerForm() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassWord: ['', [Validators.required]],
    });
  }

  submit() {
    const model = {
      userName: this.userForm.value.userName,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      confirmPassWord: this.userForm.value.confirmPassWord,
    };
    let index = this.students.findIndex(
      (item) => item.email == this.userForm.value.email
    );
    if (index == -1) {
      this.service.createUser(model).subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          text: 'vous avez bien inscrire Binevenu !',
        });
      });
      this.router.navigate(['/subjects']);
    } else {
      Swal.fire({
        icon: 'error',
        text: 'Vous avez deja Inscrit !',
      });
    }
  }

  getAllStudents() {
    this.service.getAllStudents().subscribe((res: any) => {
      this.students = res;
      console.log(this.students);
    });
  }
}
