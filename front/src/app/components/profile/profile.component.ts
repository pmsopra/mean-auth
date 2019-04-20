import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface Profile {
  user: object;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: object;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (profile: Profile)   => {
        this.user = profile.user;
      },
      err => {
        console.log(err);
        return false;
      }
    );
  }

}
