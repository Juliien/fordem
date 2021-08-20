import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {LoginComponent} from '../../authentication/login/login.component';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  selectedLang = 'fr';

  constructor(
    public dialog: MatDialog,
    public translate: TranslateService,
    public auth: AuthenticationService
  ) {
    translate.addLangs(['fr', 'en']);
    translate.setDefaultLang('fr');
  }

  switchLang(): void {
    this.translate.use(this.selectedLang);
  }

  openLogin(): void {
    this.dialog.open(LoginComponent, {
      height: '350px',
      width: '500px',
    });
  }
}
