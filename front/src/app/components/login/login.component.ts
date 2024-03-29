import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}
interface Response {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
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
        this.flashMessages.show(res.message, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });

        return;
      }

      this.authService.storeUserData(res.token, res.user);

      this.flashMessages.show('You are now logged in :)', {
        cssClass: 'alert-success',
        timeout: 3000,
      });

      this.router.navigate(['/dashboard']);
    });
  }
}
