import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { User } from '@auth0/auth0-spa-js';
import { Observable } from 'rxjs';
import { Oauth2AuthService } from '../auth/oauth2-auth.service';

@Component({
  selector: 'jhi-login',
  templateUrl: './login.component.html',
  imports: [CommonModule, MatButtonModule],
  standalone: true,
  styleUrls: [],
})
export class LoginComponent {
  constructor(private oauth2AuthService: Oauth2AuthService) {}

  isAuthenticated() :Observable<boolean> {
    return this.oauth2AuthService.isAuthenticated();
  }

  getAuthenticatedUser() :Observable<User | null | undefined> {
    return this.oauth2AuthService.getAuthenticatedUser();
  }

  login(): void {
    this.oauth2AuthService.login();
  }

  logout(): void {        
    this.oauth2AuthService.logout();
  }
}
