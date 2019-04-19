import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

interface Response {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string;
  password: string;

  constructor(
    private validateService: ValidateService,
    private flashMessages: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  onLoginSubmit() {
    const { username, password } = this;
    const user = {
      username,
      password
    };

    this.authService.authenticateUser(user).subscribe((res: Response) => {
      console.log(res);
      if (!res.success) {
        this.flashMessages.show('Something went wrong :(', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        return;
      }

      this.flashMessages.show('You are now logged in :)', {
        cssClass: 'alert-success',
        timeout: 3000,
      });
    });
  }
}
