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
      if (res.role) {
        this.usernav = res;
        console.log('res', res);
      }
    });
  }

  logOut() {
    const model = {};
    this.service.login(model).subscribe((res) => {
      this.usernav == null;
      this.service.user.next(res); // modifier la valeur de la varible user (qui est dans ayth service).
    });
  }
}
