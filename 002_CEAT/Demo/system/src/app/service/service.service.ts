import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  servicelist = {
    ceat: 'ceat'
  }

  constructor(private http: HttpClient) { }
  getCeat(st, end) {
    let path = 'http://10.170.16.107:8082/speedrpm?';
    if (st && end) {
      const devId = 'DEVICE=1c1678c4-7f48-485e-874b-8783babef309';
      const from = '&IP_FROM=' + st;
      const to = '&IP_TO=' + end;
      path = path + devId + from + to;
    }
    return this.http.get(path);
  }
}
