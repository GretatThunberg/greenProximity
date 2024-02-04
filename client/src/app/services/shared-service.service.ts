/* eslint-disable */
import { Injectable } from '@angular/core';
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
}
