import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

interface response {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessages.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessages.show('Please enter valid email', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }


    this.authService.registerUser(user).subscribe((data: response) => {
      if (!data.success) {
        this.flashMessages.show('Something went wrong :(', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        return;
      }

      this.flashMessages.show('You are now registered :)', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
      this.router.navigate(['/login']);
    });
  }
}
