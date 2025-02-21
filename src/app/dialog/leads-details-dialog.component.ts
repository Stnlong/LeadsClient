import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-dialog',
    standalone: true,
    templateUrl: './leads-details.dialog.component.html',
    styleUrls: ['./leads-details-dialog.component.css'],
    imports: [CommonModule, MatButtonModule, MatDialogModule, MatDividerModule, MatIconModule]
})
export class LeadsDetailsDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<LeadsDetailsDialogComponent>
    ) { }

    onClose(): void {
        this.dialogRef.close();
    }
}
