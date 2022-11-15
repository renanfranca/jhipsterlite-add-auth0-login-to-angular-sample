import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { Oauth2AuthService } from '../auth/oauth2-auth.service';
import { LoginComponent } from './login.component';

const mockAuthService = {
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let oauth2AuthService: Oauth2AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: AuthService, useValue: mockAuthService}]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    oauth2AuthService = TestBed.inject(Oauth2AuthService);

    fixture.detectChanges();
  });

  it('should create', () => {
    //giver when then
    expect(component).toBeTruthy();
  });

  it('should login on click on login button', () => {
    //given
    jest.spyOn(oauth2AuthService, 'login').mockImplementation(() => {});
    jest.spyOn(oauth2AuthService, 'isAuthenticated').mockImplementation(() => of(false));
    fixture.detectChanges();
    //when
    fixture.debugElement.query(By.css('#btn-login')).nativeElement.click();
    //then
    expect(oauth2AuthService.login).toHaveBeenCalledWith();
  });

  it('should render user nickname when authenticated', () => {
    //given
    const userResponse = {
      nickname: 'nickname'
    };
    jest.spyOn(oauth2AuthService, 'isAuthenticated').mockImplementation(() => of(true));
    fixture.detectChanges();
    //when
    jest.spyOn(oauth2AuthService, 'getAuthenticatedUser').mockImplementation(() => of(userResponse));
    fixture.detectChanges();
    //then
    expect(fixture.debugElement.query(By.css('span')).nativeElement.textContent).toContain('nickname');
  });

  it('should logout on click on logout button', () => {
    //given
    jest.spyOn(oauth2AuthService, 'logout').mockImplementation(() => {});
    jest.spyOn(oauth2AuthService, 'isAuthenticated').mockImplementation(() => of(true));
    fixture.detectChanges();
    //when
    fixture.debugElement.query(By.css('#btn-logout')).nativeElement.click();
    //then
    expect(oauth2AuthService.logout).toHaveBeenCalledWith();
  });
});
