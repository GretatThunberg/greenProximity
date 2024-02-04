/* eslint-disable */
import { Injectable } from '@angular/core';
import { Service } from '@app/interfaces/Service';
import { Count } from '@app/interfaces/count';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  constructor() { }

  updateData(data: Count) {
    this.dataSource.next(data);
  }

  traiterData(listService: Service[]): void {
    
    const temp = [...listService];
    
    for (let i = 0; i < temp.length; i++) {
      temp[i] = {...temp[i]};
    }

    console.log(temp);

    const gym = temp[8].length;
    const hospital = temp[1].length;
    const restaurant = temp[0].length;
    const pharma = temp[6].length;
    const epicerie = temp[5].length;
    const school = temp[2].length;
    const parc = temp[4].length;
    const bus = temp[3].length;
    const metro = temp[9].length;

    const data: Count = {
      gym: gym,
      hospital: hospital,
      restaurant: restaurant,
      drugStore: pharma,
      groceryStore: epicerie,
      school: school,
      park: parc,
      bus: bus,
      metro: metro
    };

    this.updateData(data)
  }
}
