import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlacesService } from '@app/interfaces/Service';
import { Count } from '@common/count';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../../services/shared-service.service';

@Component({
    selector: 'app-stats',
    templateUrl: './stats.component.html',
    styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
    dataSubscription: Subscription;
    stats: { name: string; value: number; color: string; place: PlacesService[] }[] = [];
    showAllPlaces: boolean = false;
    constructor(private sharedService: SharedServiceService) {}

    ngOnInit(): void {
        this.dataSubscription = this.sharedService.currentData.subscribe((data: Count) => {
            if (data) {
                this.processData(data);
            }
        });
    }

    ngOnDestroy(): void {
        this.dataSubscription.unsubscribe();
    }

    private processData(data: Count): void {
        this.stats = Object.keys(data).map((key) => {
            const value = data[key as keyof Count];
            return {
                name: key,
                value: value.nombre,
                place: value.listPlace,
                color: this.getColor(value.nombre),
            };
        });
    }

    private getColor(value: number): string {
        if (value >= 0 && value <= 2) {
            return 'red';
        } else if (value >= 3 && value <= 6) {
            return 'yellow';
        } else {
            return 'rgb(50,205,50)';
        }
    }
}
