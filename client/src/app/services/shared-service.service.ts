/* eslint-disable */
import { Injectable } from '@angular/core';
import { Service } from '@app/interfaces/Service';
import { Count } from '@common/count';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedServiceService {
    private dataSource = new BehaviorSubject<any>(null);
    currentData = this.dataSource.asObservable();

    constructor() {}

    updateData(data: Count) {
        this.dataSource.next(data);
    }

    traiterData(listService: Service[]): void {
        const temp = [...listService];

        for (let i = 0; i < temp.length; i++) {
            temp[i] = { ...temp[i] };
        }

        console.log(temp);

        const gym = { nombre: temp[8].length, listPlace: temp[8].places };
        const hospital = { nombre: temp[1].length, listPlace: temp[1].places };
        const restaurant = { nombre: temp[0].length, listPlace: temp[0].places };
        const pharma = { nombre: temp[6].length, listPlace: temp[6].places };
        const epicerie = { nombre: temp[5].length, listPlace: temp[5].places };
        const school = { nombre: temp[2].length, listPlace: temp[2].places };
        const parc = { nombre: temp[4].length, listPlace: temp[4].places };
        const bus = { nombre: temp[3].length, listPlace: temp[3].places };

        const data: Count = {
            gym: gym,
            hospital: hospital,
            restaurant: restaurant,
            drugStore: pharma,
            groceryStore: epicerie,
            school: school,
            park: parc,
            bus: bus,
        };

        this.updateData(data);
    }
}
