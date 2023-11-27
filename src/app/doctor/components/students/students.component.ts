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
  dataTable: any;
  constructor(private service: AuthService) {
    this.displayedColumns = ['userId', 'name', 'matiere', 'resultat'];
  }

  ngOnInit(): void {
    this.getAllStudenets();
  }

  getAllStudenets() {
    // en va retourne une array of object {name,subjects,degree} l'objet doit etre stocke dans "dataSource"
    this.service.getAllStudents('students').subscribe((res: any) => {
      this.dataSource = res.map((student: any) => {
        if (student?.subjects) {
          return student?.subjects?.map((sub: any) => {
            return {
              name: student.userName,
              subjects: sub.name,
              degree: sub.degree,
            };
          });
        } else {
          return [
            {
              name: student.userName,
              subjects: '-',
              degree: '-',
            },
          ];
        }
      });
      console.log(this.dataSource);
      this.dataTable = [];
      this.dataSource.forEach((item: any) => {
        item.forEach((subItem: any) => {
          this.dataTable.push({
            name: subItem.name,
            subjects: subItem.subjects,
            degree: subItem.degree,
          });
        });
      });
      console.log('consoleee', this.dataTable);
    });
  }
}
