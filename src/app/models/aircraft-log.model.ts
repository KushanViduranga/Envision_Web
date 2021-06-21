import { Time } from "@angular/common";

export class AircraftLogVM {
    id?: number;
    make?: string;
    model?: string;
    registration?: string;
    location?: string;
    dateTime?: string;
    createBy?: number;
    modifiedBy?: number;
    //file?: File;
    base64image?: string;
    imageExtension?: string;
    
    date?: any;
    time?: any;
    seenDateTime?: string;
}
