import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
    private indicator = new Subject<any>();
    changeEmitted$ = this.indicator.asObservable();
    emitIndicatorChange(change: any) {
        this.indicator.next(change);
    }
}