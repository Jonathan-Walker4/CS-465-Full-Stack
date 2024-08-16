import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {
  public editForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  ngOnInit(): void {
    // Retrieve stashed trip ID
    const tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn't find where the tripCode was stored!");
      this.router.navigate(['']);
      return;
    }
  
    this.editForm = this.formBuilder.group({
      _id: [],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });
  
    // Fetch the specific trip data by its code
    this.tripDataService.getTrip(tripCode)
    .subscribe({
      next: (tripData: Trip) => {
        if (tripData) {
          // Convert the start date to YYYY-MM-DD format
          const formattedDate = new Date(tripData.start).toISOString().split('T')[0];
          
          // Patch the form values including the formatted start date
          this.editForm.patchValue({
            code: tripData.code,
            name: tripData.name,
            length: tripData.length,
            start: formattedDate, // Set the date in YYYY-MM-DD format
            resort: tripData.resort,
            perPerson: tripData.perPerson,
            image: tripData.image,
            description: tripData.description
          });
          this.message = `Trip: ${tripCode} retrieved`;
        } else {
          this.message = 'No Trip Retrieved!';
        }
      },
      error: () => {
        this.message = 'An error occurred while retrieving the trip data.';
      }
    });
  }
  
  public onSubmit(): void {
    this.submitted = true;
    if (this.editForm.valid) {
      this.tripDataService.updateTrip(this.editForm.value)
        .subscribe({
          next: () => {
            this.router.navigate(['']);
          },
          error: () => {
            this.message = 'An error occurred while updating the trip.';
          }
        });
    } else {
      this.message = 'Please correct the errors in the form before submitting.';
    }
  }

  // Get the form short name to access the form fields
  get f() { return this.editForm.controls; }
}
