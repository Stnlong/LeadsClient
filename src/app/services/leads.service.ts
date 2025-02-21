import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Leads } from '../models/leads-model';
import { LoggingService } from './logging.service';

@Injectable({
    providedIn: 'root',
})
export class LeadsService {
    private apiUrl = 'https://localhost:44327/Leads'; // create and move to env file

    constructor(private http: HttpClient, private loggingService: LoggingService) { }

    getData(): Observable<Leads[]> {
        return this.http.get<Leads[]>(this.apiUrl)
            .pipe(
                retry(3),
                catchError(this.handleError<Leads[]>('getData', []))
            );
    }

    // used to simulate new data being received
    addLeads(leads: Leads[]): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.apiUrl}/AddLeads`, leads, { headers })
            .pipe(
                map(response => {
                    this.loggingService.log(response.message);
                    return response;
                }),
                catchError(this.handleError<any>('addLeads'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: HttpErrorResponse): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`);
            this.loggingService.error(`${operation} failed: ${error.message}`);

            return throwError(() => new Error('An error has occurred; please try again later.'));
        };
    }

}
