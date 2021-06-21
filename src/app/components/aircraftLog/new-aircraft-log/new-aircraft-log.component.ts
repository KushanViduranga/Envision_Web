import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpStatusCode } from 'src/app/common/response.model';
import { AircraftLogVM } from '../../../models/aircraft-log.model';

import { AircraftLogService } from '../../../services/aircraft-log.service';

@Component({
  selector: 'app-new-aircraft-log',
  templateUrl: './new-aircraft-log.component.html',
  styleUrls: ['./new-aircraft-log.component.css']
})
export class NewAircraftLogComponent implements OnInit {

  title: string = "";
  //imageUrl: string = "/assets/images/default.jpg";
  imageUrl: any;
  formData: AircraftLogVM;
  private base64textString: string = "";
  fileName: string = "";
  private fileType: string = "";

  constructor(
    private toastr: ToastrService,
    private datepipe: DatePipe,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private _aircraftLogService: AircraftLogService
  ) {
    this.formData = new AircraftLogVM();
  }

  ngOnInit(): void {
    this.resetForm();

    this.route.paramMap.subscribe(params => {
      let id: any = params.get('id');
      if (id != null) {
        this.getAircraftLog(id);
        this.title = "Update Aircraft Log";
      }
      else {
        this.title = "New Aircraft Log";
      }
    });
  }

  getAircraftLog(id: number) {
    this._aircraftLogService.getAircraftLog(id)
      .subscribe(data => {
        if (data.statusCode == HttpStatusCode.OK) {

          let resDateTimeString = this.datepipe.transform(data.result?.dateTime, 'yyyy-MM-dd h:mm:ss a');
          let resDateTime = resDateTimeString != null ? new Date(resDateTimeString) : new Date();
          let currentTime = ("0" + resDateTime.getHours()).slice(-2) + ':' + ("0" + resDateTime.getMinutes()).slice(-2);

          this.formData.id = data.result?.id;
          this.formData.make = data.result?.make;
          this.formData.model = data.result?.model;
          this.formData.registration = data.result?.registration;
          this.formData.location = data.result?.location;
          this.formData.date = this.datepipe.transform(data.result?.dateTime, 'yyyy-MM-dd');
          this.formData.time = currentTime;

          this.displayImage(data.result?.base64image, data.result?.imageExtension);
        }
        else {
          this.toastr.error(data.message, "Update Aircraft Log");
        }
      });
  }

  resetForm(form?: NgForm) {
    let currentDateTime = new Date();
    let currentTime = ("0" + currentDateTime.getHours()).slice(-2) + ':' + ("0" + currentDateTime.getMinutes()).slice(-2);

    if (form != null)
      form.resetForm();
    this.formData = {
      id: 0,
      make: '',
      model: '',
      registration: '',
      location: '',
      seenDateTime: '',
      date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      time: currentTime,
      base64image: ''
    }
  }

  onSubmit(form: NgForm) {
    form.value.seenDateTime = form.value.date + " " + form.value.time;
    form.value.base64image = this.base64textString == "" ? "" : "data:image/jpg;base64," + this.base64textString;

    if (this.isValid(form.value, this.base64textString)) {
      if (form.value.id == 0) {
        form.value.createBy = 1;
        this.insertRecord(form);
      }
      else {
        form.value.modifiedBy = 1;
        this.updateRecord(form);
      }
    }

  }

  insertRecord(form: NgForm) {
    this._aircraftLogService.saveAircraftLog(form.value)
      .subscribe((res) => {
        if (res.statusCode == HttpStatusCode.OK) {
          this.toastr.success("Successfully inserted", "New Aircraft Log");
          //this.resetForm(form);
          this.onBack();
        }
        else {
          this.toastr.error(res.message, "New Aircraft Log");
        }
      });
  }

  updateRecord(form: NgForm) {
    this._aircraftLogService.updateAircraftLog(form.value)
      .subscribe((res) => {
        if (res.statusCode == HttpStatusCode.OK) {
          this.toastr.success("Successfully updated", "Update Aircraft Log");
          //this.resetForm(form);
          this.onBack();
        }
        else {
          this.toastr.error(res.message, "Update Aircraft Log");
        }
      });
  }

  isValid(formData: any, base64textString: string) {
    if (new Date() < new Date(formData.seenDateTime)) {
      this.toastr.warning("Date or time is invalid", "New Aircraft Log");
      return false;
    }
    else if (formData.id == 0 && (base64textString == "" || base64textString == undefined)) {
      this.toastr.warning("Select Valid Image", "New Aircraft Log");
      return false;
    }
    else if (formData.registration.length > 8) {
      this.toastr.warning("Registration is invalid", "New Aircraft Log");
      return false;
    }
    else if (formData.registration.length <= 8) {
      let reg_No = formData.registration.split("-");
      if (reg_No[0].length > 2) {
        this.toastr.warning("Registration No is invalid", "New Aircraft Log");
        return false;
      }
      else if (reg_No[0].length > 5) {
        this.toastr.warning("Registration No is invalid", "New Aircraft Log");
        return false;
      }

    }

    return true;
  }

  onFileSelected(evt: any) {
    this.fileName = "";
    this.fileType = "";

    var files = evt.target.files;
    var file = files[0];

    if (file.type != "image/jpeg") {
      this.toastr.warning("Unsupport image format(Select JPG)", "New Aircraft Log");
      files = null;
    }
    else if (file.type == "") {
      this.toastr.warning("Unsupport image format(Select JPG)", "New Aircraft Log");
    }
    //https://www.gbmb.org/mb-to-bytes
    else if (file.size > 1048576) {
      this.toastr.warning("Unsupport image size(Max 1MB)", "New Aircraft Log");
    }
    else {
      this.fileName = file.name;
      this.fileType = file.type;

      if (files && file) {
        var reader = new FileReader();

        reader.onload = this._convertBinary.bind(this);

        reader.readAsBinaryString(file);
      }
    }
  }

  _convertBinary(readerEvt: any) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
  }

  displayImage(base64image: string = "", imageExtension: string = "") {
    this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/jpg;base64, ${base64image}`);
  }

  onBack(): void {
    this.router.navigate(['']);
  }
}
