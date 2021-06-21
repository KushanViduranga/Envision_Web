import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAircraftLogComponent } from '../app/components/aircraftLog/list-aircraft-log/list-aircraft-log.component';
import { NewAircraftLogComponent } from '../app/components/aircraftLog/new-aircraft-log/new-aircraft-log.component';

const routes: Routes = [
  { path: '', component: ListAircraftLogComponent},
  { path: 'newAircraftLog', component: NewAircraftLogComponent },
  { path: 'loadAircraftLog/:id', component: NewAircraftLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
