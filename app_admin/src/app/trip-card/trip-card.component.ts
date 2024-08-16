import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;

  constructor(
    private router: Router,
    public authService: AuthenticationService // Injecting AuthenticationService
  ) {}

  public editTrip(trip: Trip) {
    if (this.authService.isLoggedIn()) { // Ensure user is logged in before allowing edit
      localStorage.removeItem('tripCode');
      localStorage.setItem('tripCode', trip.code);
      this.router.navigate(['edit-trip']);
    }
  }
}
