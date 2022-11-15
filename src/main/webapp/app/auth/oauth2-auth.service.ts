import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { User } from '@auth0/auth0-spa-js';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class Oauth2AuthService {
  constructor(private auth: AuthService) {}

  getAuthenticatedUser() :Observable<User | null | undefined> {
    return this.auth.user$;
  }

  isAuthenticated() :Observable<boolean> {
    return this.auth.isAuthenticated$;
  }

  getToken(): Observable<string> {
    return this.auth.getAccessTokenSilently()
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({returnTo: environment.auth0.redirectUri});
  }
}
