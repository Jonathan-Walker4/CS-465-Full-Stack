import { Routes, RouterModule } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { NgModule } from '@angular/core';  // Import NgModule
import { EditTripComponent } from './edit-trip/edit-trip.component';

export const routes: Routes = [
  { path: 'add-trip', component: AddTripComponent },
  { path: '', component: TripListingComponent, pathMatch: 'full' },
  { path: 'edit-trip', component: EditTripComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }