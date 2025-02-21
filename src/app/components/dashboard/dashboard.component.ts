import { Component, OnInit } from '@angular/core';
import { LeadsService} from '../../services/leads.service';
import { Leads } from '../../models/leads-model';


import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { LeadsDetailsDialogComponent } from '../../dialog/leads-details-dialog.component';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';


@Component({
    selector: 'app-root',
    templateUrl: './dashboard.component.html',
    imports: [MatCheckboxModule, MatTableModule, MatExpansionModule, MatIconModule],
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    displayedColumns: string[] = ['name', 'phone', 'zip', 'canContact', 'email'];
    dataSource: Leads[] = [];
    loading: boolean = false;
    private destroy$ = new Subject<void>(); // subject for cleanup

    constructor(private leadsService: LeadsService, public dialog: MatDialog) { }
    
    ngOnInit(): void {
        this.loading = true;
        this.leadsService
            .getData()
            .pipe(
                tap((response: Leads[]) => {
                    this.dataSource = response;
                    this.loading = false;
                }),
                takeUntil(this.destroy$) // unsubscribes when component is destroyed
            )
            .subscribe({
                error: (error) => {
                    console.error('Error fetching data:', error);
                    this.loading = false;
                }
            });
    }

    openDialog(row: Leads): void {
        this.dialog.open(LeadsDetailsDialogComponent, {
            data: row
        });
    }

    // button click to simulate new data being received
    sendMockData(): void {
        this.loading = true;
        const startIndex = this.dataSource.length;
        const mockLeads = Array.from({ length: 50 }, (_, i) => ({
            id: startIndex + i + 1,
            name: `Test User ${startIndex + i + 1}`,
            phone: `555-${String(startIndex + i + 1).padStart(4, '0')}`,
            zip: `${String(10000 + startIndex + i).padStart(5, '0')}`,
            canContact: (startIndex + i + 1) % 2 === 0,
            email: `test.user${startIndex + i + 1}@example.com`,
            details: `Interested in testing ${startIndex + i + 1}`
        }));

        this.leadsService
            .addLeads(mockLeads)
            .pipe(
                tap((response: any) => console.log('Leads processed successfully:', response)),
                switchMap(() => this.leadsService.getData()), // get data after adding leads
                tap((response: Leads[]) => {
                    this.dataSource = response;
                    this.loading = false;
                }),
                takeUntil(this.destroy$)
            )
            .subscribe({
                error: (error) => {
                    console.error('Error fetching data:', error);
                    this.loading = false;
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next(); // unsubscribe from observables
        this.destroy$.complete();
    }
}