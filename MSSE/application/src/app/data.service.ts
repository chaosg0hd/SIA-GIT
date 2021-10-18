import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  isMobile!: boolean

  setIsMobile(status: boolean) {
    this.isMobile = status
  }

  getIsMobile() {
    return this.isMobile
  }

  apiURL = "http://192.168.1.7/SIA-GIT/API/";

  sendApiRequest(method: any, data: any) {
    return <any>(
      this.http.post(this.apiURL + method, btoa(JSON.stringify(data))
      )
    );
  }

  getIPAddress() {
    return this.http.get("http://192.168.1.7/SIA-GIT/appAPI/checkAPI");
  }


}
