import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';

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

  constructor(private validateService: ValidateService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    console.log(user);
    if (!this.validateService.validateRegister(user)) {
      console.log('Please fill all');
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      console.log('Please fill valid email');
      return false;
    }

    console.log('True');

  }
}
