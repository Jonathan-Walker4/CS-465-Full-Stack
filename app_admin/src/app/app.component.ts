import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Travlr Getaways Admin!';

  constructor(public authService: AuthenticationService) {}

  openLoginModal() {
    console.log('Opening login modal...');
  }

  logout() {
    this.authService.logout();
    console.log('User logged out');
  }
}
