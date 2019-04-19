import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogoutClick() {
    this.authService.logout();

    this.flashMessages.show('You are now logged out', {
      cssClass: 'alert-success',
      timeout: 3000,
    });

    this.router.navigate(['/login']);
    return false;
  }
}
