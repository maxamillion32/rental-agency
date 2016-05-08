import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import {Component} from '@angular/core';
import {DataService} from './data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  template: `
    <div class="margin--small  text-center">
        <form [hidden]="hasAuth$ | async" (ngSubmit)="login()" class="margin--small" #loginForm="ngForm">
            <div>Email: <input type="email" [(ngModel)]="email" required/></div>
            <div>Password: <input type="password" [(ngModel)]="password" required/></div>
            <div><button class="btn" (click)="login()" type="submit" [disabled]="!loginForm.form.valid">Login</button></div>
        </form>
        <div [hidden]="!(hasAuth$ | async)">
            <button class="btn" (click)="logout()">Logout</button>
        </div>
    </div>  
  `
})
export class LoginComponent {
  hasAuth$: Observable<boolean>;
  email: string;
  password: string;
  hasAuthSub: Subscription;
  constructor(private dataService: DataService, private router: Router) {
      this.hasAuth$ = dataService.hasAuth$;
  }
  
  ngOnInit() {
      this.hasAuthSub = this.hasAuth$.subscribe(hasAuth => {
          this.email = this.password = '';
          if (hasAuth) {
              this.router.navigate(['/']);
          }
        });
  }
  
  ngOnDestroy() {
      this.hasAuthSub.unsubscribe();
  }
  
  login() {
      this.dataService.login(this.email, this.password);
  }
  
  logout() {
      this.dataService.logout();
  }
}
