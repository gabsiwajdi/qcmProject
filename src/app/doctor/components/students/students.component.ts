import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  listStudents: any[] = [];
  dataSource: any;
  displayedColumns: any;
  constructor(private service: AuthService) {
    this.displayedColumns = ['id', 'name', 'matiere', 'resultat'];
  }

  ngOnInit(): void {
    this.getAllStudenets();
  }

  getAllStudenets() {
    this.service.getAllStudents('students').subscribe((res: any) => {
      this.listStudents = res;
      console.log(this.listStudents);
    });
  }
}
