import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
})
export class SubjectsComponent implements OnInit {
  subjects: any[] = [];
  user: any;

  constructor(
    private service: DoctorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllSubjects();
    this.getUserInfo();
  }

  getAllSubjects() {
    this.service.getAllSubjects().subscribe((res: any) => {
      this.subjects = res;
      console.log(this.subjects);
    });
  }

  getUserInfo() {
    // utilisateur qui est deja login

    this.authService.getRole().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });
  }
  deletSubject(index: number) {
    let id = this.subjects[index].id;
    this.subjects.splice(index, 1);
    this.service.deleteSubject(id).subscribe((res) => {
      Swal.fire({
        icon: 'success',
        text: 'subject deleted ! ',
      });
    });
  }
  getSubjectById() {}
}
