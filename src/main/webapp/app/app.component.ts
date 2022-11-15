import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'jhi-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterModule, MatMenuModule, MatToolbarModule, MatIconModule, MatButtonModule, LoginComponent],
  standalone: true,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  appName = '';

  ngOnInit(): void {
    this.appName = 'baby';
  }
}
