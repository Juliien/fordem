import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;
  errorMessage: any;

  constructor(
    formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    public dialog: MatDialogRef<LoginComponent>
  ) {
    this.emailCtrl = formBuilder.control('', Validators.required);
    this.passwordCtrl = formBuilder.control('', Validators.required);

    this.loginForm = formBuilder.group({
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  onSubmit(): void {
    this.authenticationService.login(this.loginForm.value).subscribe(result => {
      localStorage.setItem('token', result.token);
      this.authenticationService.token = result.token;
      this.authenticationService.decodedToken = this.authenticationService.decodeToken(result.token);
      this.dialog.close();
    }, (e) => {
      this.errorMessage = e.error.message;
    });
  }
}
