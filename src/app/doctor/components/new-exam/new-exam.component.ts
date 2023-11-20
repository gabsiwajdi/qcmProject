import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss'],
})
export class NewExamComponent implements OnInit {
  name = new FormControl(''); //un formulaire avec un seul valeur

  questionForm!: FormGroup;
  questions: any[] = [];
  correctNum: any;
  startAdd = false;
  preview = false;
  subjectName = '';
  id: any;
  constructor(private fb: FormBuilder, private service: DoctorService) {}

  ngOnInit(): void {
    this.creerquestionsForm();
  }

  creerquestionsForm() {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required]],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],
    });
  }

  getCorrect(event: any) {
    this.correctNum = event.value;
    console.log('correct Num' + this.correctNum);
  }
  crrerQuestion() {
    if (this.correctNum) {
      const model = {
        question: this.questionForm.value.question,
        answer1: this.questionForm.value.answer1,
        answer2: this.questionForm.value.answer2,
        answer3: this.questionForm.value.answer3,
        answer4: this.questionForm.value.answer4,
        correctAnswer: this.questionForm.value[this.correctNum],
      };
      this.questions.push(model);
      this.questionForm.reset(); // vider le formulaire
    } else {
      Swal.fire({
        icon: 'error',
        text: 'vous devez indique la correcte répense  !',
      });
    }
    console.log(this.questions);
  }

  start() {
    if (this.name.value == '') {
      this.startAdd = false;
      Swal.fire({
        icon: 'error',
        text: 'nom du matiere est Obligatoir !',
      });
    } else {
      this.startAdd = true;
      this.subjectName = this.name.value;
    }
  }
  cancel() {
    this.questionForm.reset();
    this.questions = [];
    this.subjectName = '';
    this.name.reset();
    this.startAdd = false;
  }

  clearForm() {
    this.questionForm.reset();
  }

  submit() {
    const model = {
      name: this.subjectName,
      questions: this.questions,
    };
    this.service.creerSubject(model).subscribe((res: any) => {
      this.id = res.id;
      Swal.fire({
        icon: 'success',
        text: 'le test est creer avec succer! ',
      });
    });
    this.preview = true;
    this.questionForm.reset();
    this.name.reset();
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);

    const model = {
      name: this.subjectName,
      questions: this.questions,
    };
    this.service.sdeleteSubject(model, this.id).subscribe((res: any) => {
      console.log(this.id);
      Swal.fire({
        icon: 'success',
        text: 'question supprimer avec succes ',
      });
    });
  }
}
