import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent implements OnInit {

  constructor(public authService: AuthenticationService,private router: Router) { }

  logout() {
    this.authService.logout().subscribe(() =>{
      this.router.navigate(['']);
    });
  }

  ngOnInit() {}

}
