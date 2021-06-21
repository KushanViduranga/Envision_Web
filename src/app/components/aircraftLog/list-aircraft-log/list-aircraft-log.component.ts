import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { HttpStatusCode } from 'src/app/common/response.model';
import { AircraftLogService } from '../../../services/aircraft-log.service';


@Component({
  selector: 'app-list-aircraft-log',
  templateUrl: './list-aircraft-log.component.html',
  styleUrls: ['./list-aircraft-log.component.css']
})
export class ListAircraftLogComponent implements OnInit {

  aircraftLogList: any;
  filterMake: string = "";
  filterModel: string = "";
  filterRegistration: string = "";

  constructor(
    private toastr: ToastrService,
    private _aircraftLogService: AircraftLogService
  ) { }

  ngOnInit(): void {
    this.getAircraftLogs();
  }

  getAircraftLogs() {
    this._aircraftLogService.getAircraftLogs()
      .subscribe(data => {
        if (data.statusCode == HttpStatusCode.OK) {
          this.aircraftLogList = data.result;
        }
        else {
          this.toastr.error(data.message);
        }
      });
  }

  deleteAircraftLog(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this._aircraftLogService.deleteAircraftLog(id)
        .subscribe(data => {
          if (data.statusCode == HttpStatusCode.OK) {
            this.getAircraftLogs();
            this.toastr.success("Successfully deleted");
          }
          else {
            this.toastr.error(data.message);
          }
        });
    }
  }

  searchAircraftLog() {
    if (this.filterMake == "" && this.filterModel == "" && this.filterRegistration == "") {
      this.getAircraftLogs();
    }
    else {
      this._aircraftLogService.getFilteredAircraftLogs(this.filterMake, this.filterModel, this.filterRegistration)
        .subscribe(data => {
          if (data.statusCode == HttpStatusCode.OK) {
            this.aircraftLogList = data.result;
          }
          else {
            this.toastr.error(data.message);
          }
        });
    }

  }

}
