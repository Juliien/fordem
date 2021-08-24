import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../services/authentication.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.scss']
})
export class RegisterDetailComponent {
  @Input() accountRole: string;
  hide = true;
  check = false;
  accountForm: FormGroup;
  nameCtrl: FormControl;
  emailCtrl: FormControl;
  phoneCtrl: FormControl;
  passwordCtrl: FormControl;
  roleCtrl: FormControl;
  errorMessage: string;

  constructor(
    public formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.nameCtrl = formBuilder.control('', Validators.required);
    this.emailCtrl = formBuilder.control('', Validators.required);
    this.passwordCtrl = formBuilder.control('', Validators.required);
    this.phoneCtrl = formBuilder.control('', Validators.required);

    this.accountForm = formBuilder.group({
      name: this.nameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
      phoneNumber: this.phoneCtrl,
      role: this.roleCtrl
    });
  }

  openSnackBar(): void {
    this.snackBar.open('register.success', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onSubmit(): void {
    this.accountForm.patchValue({role: this.accountRole});
    this.authenticationService.register(this.accountForm.value).subscribe((account) => {
      this.openSnackBar();
      const loginForm = {
        email: this.accountForm.value.email,
        password: this.accountForm.value.password
      };
      this.authenticationService.login(loginForm).subscribe(result => {
        localStorage.setItem('token', result.token);
        this.authenticationService.decodedToken = this.authenticationService.decodeToken(result.token);
        this.router.navigate(['home']).then();
      }, (e) => {
        this.errorMessage = e.error.message;
      });
    });
  }
}
