import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  path = 'http://localhost:8082/api/';
  services = {
    'compile': 'compile'
  };
  constructor(private http: HttpClient) { }

  public compile(source, language, input) {
    const data = {
      source: source,
      language: language,
      input: input
    };
    return this.http.post(this.path + this.services.compile, data);
  }
}
