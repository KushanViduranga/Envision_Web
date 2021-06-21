export class Response<T> {
    statusCode?: number;
    message?: string;
    result?: T;
}

export enum HttpStatusCode {
    OK = 200,
    NotFound = 404,
    BadRequest = 400,
    Conflict = 409
}