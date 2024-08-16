import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  submitted = false;
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
      return; // Stop the process here if form validation fails
    }
    this.doLogin();
  }

  private doLogin(): void {
  const email = this.credentials.email;  // Get email as a string
  const password = this.credentials.password;  // Get password as a string

  this.authenticationService.login(email, password).subscribe({
    next: (response) => {
      if (this.authenticationService.isLoggedIn()) {
        this.router.navigate(['']);
      } else {
        setTimeout(() => {
          if (this.authenticationService.isLoggedIn()) {
            this.router.navigate(['']);
          }
        }, 3000);
      }
    },
    error: (error) => {
      console.error('Login failed', error);
    }
  });
  }}