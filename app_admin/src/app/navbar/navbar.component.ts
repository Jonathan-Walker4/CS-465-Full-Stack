import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule for routing
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
