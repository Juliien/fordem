import { Component} from '@angular/core';
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
  hide = true;
  check = false;
  accountForm: FormGroup;
  displayNameCtrl: FormControl;
  emailCtrl: FormControl;
  passwordCtrl: FormControl;

  constructor(
    public formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar)
  {
    this.displayNameCtrl = formBuilder.control('', Validators.required);
    this.emailCtrl = formBuilder.control('', Validators.required);
    this.passwordCtrl = formBuilder.control('', Validators.required);

    this.accountForm = formBuilder.group({
      displayName: this.displayNameCtrl,
      email: this.emailCtrl,
      password: this.passwordCtrl,
    });
  }

  openSnackBar(): void {
    this.snackBar.open('Le compte a été cree avec succès', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onSubmit(): void {
    // this.authenticationService.register(this.userForm.value).subscribe(() => {
    //   this.openSnackBar();
    //   const loginForm = {
    //     "email": this.userForm.value["email"],
    //     "password": this.userForm.value["password"]
    //   };
    //   this.authenticationService.login(loginForm).subscribe(user => {
    //     this.userService.currentUser = user;
    //     sessionStorage.setItem('token', user.token);
    //     sessionStorage.setItem('user_id', user._id);
    //     this.router.navigate(['home']).then();
    //   });
    // });
  }
}
