import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  usernav: any = null;

  constructor(private service: AuthService) {}

  ngOnInit(): void {
    this.service.user.subscribe((res: any) => {
      this.usernav = res;
      console.log('navbar ' + this.usernav);
    });
  }
}
