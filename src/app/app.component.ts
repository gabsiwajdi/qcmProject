import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private service: AuthService) {}
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.service.getRole().subscribe((res: any) => {
      this.service.user.next(res); // variable  "user (declarer en authService.ts)"  de type subject doit utiliser "next".
    });
  }
}
