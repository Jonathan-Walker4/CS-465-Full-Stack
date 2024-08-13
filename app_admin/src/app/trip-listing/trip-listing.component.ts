import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Array<Trip> = [];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
    ) {
    console.log('trip-listing constructor');
  }

  public editTrip(tripCode: string): void {
    localStorage.setItem('tripCode', tripCode);
    this.router.navigate(['/edit-trip']);
  }
  

  public addTrip(): void {
    console.log('Add Trip button clicked');
    this.router.navigate(['/add-trip']);
  }

  private getStuff(): void {
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: Trip[]) => {
          this.trips = value;
          if (value.length > 0) {
            this.message = `There are ${value.length} trips available.`;
          } else {
            this.message = 'There were no trips retrieved from the database';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.error('Error fetching trips:', error); // More detailed error logging
        }
      });
  }
  

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff();
  }
}
