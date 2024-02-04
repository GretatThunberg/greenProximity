import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedServiceService } from '../../services/shared-service.service'; 
import { Count } from '@common/count'; 

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  dataSubscription: Subscription;
  stats: { name: string, value: number, color: string }[] = [];

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
        value: value,
        color: this.getColor(value), 
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
  

  testObservable(): void {
    const testCount: Count = {
      school: 10,
      restaurant: 2,
      groceryStore: 3,
      park: 1,
      drugStore: 5,
      gym: 6,
      hospital: 7,
      bus: 8,
      metro: 9
    }
    console.log(testCount);
    this.sharedService.updateData(testCount);
  }
}