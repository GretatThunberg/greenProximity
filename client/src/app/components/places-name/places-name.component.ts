import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlacesService } from '@app/interfaces/Service';
@Component({
    selector: 'app-places-name',
    templateUrl: './places-name.component.html',
    styleUrls: ['./places-name.component.scss'],
})
export class PlacesNameComponent {
    // @Input() inputMessage: PlacesService[];
    @Input() nameService: string = '';
    @Input() places: PlacesService[] = [];
    showAllPlaces: boolean = false;
    constructor(private readonly matDialog: MatDialog) {}

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('seeMoreDialogContent')
    private readonly seeMoreDialogContent: TemplateRef<HTMLElement>;

    seeMore(): void {
        this.matDialog.open(this.seeMoreDialogContent);
    }
}
