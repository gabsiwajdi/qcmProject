import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  user: any;
  total: number = 0;
  shwoResult = false;
  constructor(
    private route: ActivatedRoute,
    private service: DoctorService,
    private authService: AuthService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getSubjectById();
    this.getUserInfo();
  }

  getSubjectById() {
    this.service.getSubjectById(this.id).subscribe((res: any) => {
      this.subject = res;
    });
  }
  deleteQuestion(index: number) {
    this.subject.questions.splice(index, 1);

    const model = {
      name: this.subject.name,
      questions: this.subject.questions,
    };
    this.service.sdeleteSubject(model, this.id).subscribe((res: any) => {
      console.log(this.id);
      Swal.fire({
        icon: 'success',
        text: 'question supprimer avec succes ',
      });
    });
  }

  getAnswer(event: any) {
    // ajouter a lobjet "question" la repens de l'etudiant "studentsAnswer " on va ajouter un nouveau clé nomme studentsAnswer eluui donner un valeur "value".
    // donc value contient la repense de l'etudiant & questionIndex lindex du question
    let value = event.value;
    let questionIndex = event.source.name;
    this.subject.questions[questionIndex].studentsAnswer = value; // la repense du question X (questionIndex) est "value"
    console.log(this.subject.questions);
  }

  getUserInfo() {
    // utilisateur qui est deja login

    this.authService.getRole().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
    });
  }

  getResult() {
    this.total = 0;
    for (let x in this.subject.questions) {
      if (
        this.subject.questions[x].studentsAnswer ==
        this.subject.questions[x].correctAnswer
      ) {
        this.total++;
      }
    }
    this.shwoResult = true;
    console.log(this.total);
  }
}
