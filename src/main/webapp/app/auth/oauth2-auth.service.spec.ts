import { TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Oauth2AuthService } from './oauth2-auth.service';

jest.mock('../../environments/environment', () => ({
  environment: {
    production: false,
    auth0: {
      domain: 'dev-99.us.auth0.com',
      clientId: '99',
      audience: 'https://dev-99.us.auth0.com/api/v2/',
      redirectUri: window.location.origin
    },
  },
}));

const mockAuthService = {
  getAccessTokenSilently: jest.fn(),
  loginWithRedirect: jest.fn(),
  logout: jest.fn()
};

describe('Oauth2 Auth Service', () => {
  let service: Oauth2AuthService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{provide: AuthService, useValue: mockAuthService}]
    });

    service = TestBed.inject(Oauth2AuthService);
    authService = TestBed.inject(AuthService);
  });

  it('should login', () => {
    //given
    jest.spyOn(authService, 'loginWithRedirect').mockReturnValue(of());
    //when
    service.login();
    //then
    expect(authService.loginWithRedirect).toHaveBeenCalledWith();
  });

   it('should authenticated', async () => {
    //given
    Object.defineProperty(authService, 'isAuthenticated$', {
      value: of(true),
    });
    //when
    const authenticated: boolean = await lastValueFrom(service.isAuthenticated());
    //then
    expect(authenticated).toBeTruthy();
  });

   it('should get token', async () => {
    //given
    jest.spyOn(authService, 'getAccessTokenSilently').mockReturnValue(of('123@token'));
    //when
    const token = await lastValueFrom(service.getToken());
    //then
    expect(authService.getAccessTokenSilently).toHaveBeenCalledWith();
    expect(token).toEqual('123@token');
  });

  it('should get authenticated user', async () => {
   //given
   let userMock= {
      nickname: 'nickname'
   };
   Object.defineProperty(authService, 'user$', {
     value: of(userMock),
   });
   //when
   const authenticatedUser = await lastValueFrom(service.getAuthenticatedUser());
   //then
   expect(authenticatedUser).toBeDefined();
   expect(authenticatedUser?.nickname).toEqual('nickname');
 });

 it('should logout', () => {
   //given
   jest.spyOn(authService, 'logout').mockImplementation();
   //when
   service.logout();
   //then
   expect(authService.logout).toHaveBeenCalledWith({returnTo: environment.auth0.redirectUri});
 });
});