import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListAircraftLogComponent } from './components/aircraftLog/list-aircraft-log/list-aircraft-log.component';
import { NewAircraftLogComponent } from './components/aircraftLog/new-aircraft-log/new-aircraft-log.component';

import { AircraftLogService } from './services/aircraft-log.service';

@NgModule({
  declarations: [
    AppComponent,
    ListAircraftLogComponent,
    NewAircraftLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
  ],
  providers: [
    DatePipe,
    
    AircraftLogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
