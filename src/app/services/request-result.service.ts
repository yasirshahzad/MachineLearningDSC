import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestResultService {
  url = "https://mlproductiondsc.appspot.com/api";


  constructor(private http: HttpClient) {
  }

  getResult(data) {
    return this.http.post(this.url, data);
  }
}
