import { HttpAuthInterceptor } from './app/auth/http-auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { routes } from './app/app.route';
import { AppComponent } from './app/app.component';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    importProvidersFrom([BrowserAnimationsModule, HttpClientModule, RouterModule.forRoot(routes)]),
  ],
}).catch(err => console.error(err));
