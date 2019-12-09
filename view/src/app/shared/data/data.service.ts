import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {sens_data} from './sens_data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  selectedData: sens_data = {
    id: '',
    sensName: '',
    date: '',
    time: '',
    Temp: '',
    Humidity: '',
    Barometer: '',
    Accelerometer: '',
    Magnetometer: '',
    Gyroscope: '',
    Light: '',
    Battery: '',
    user: '',
  };

  constructor(private http: HttpClient) { }
  AuthHeader = { headers: new HttpHeaders({ NoAuth: 'False' }) };
// HttpMethods

postData(data: sens_data) {
  return this.http.post(environment.apiBaseUrl + '/sens_data/sensData', data, this.AuthHeader);
}

putData(data: sens_data) {
  return this.http.put(environment.apiBaseUrl + '/sens_data/sensData/' + `/${data.id}` , data, this.AuthHeader);
}
// tslint:disable-next-line:variable-name
getData(_id: string) {
  return this.http.get(environment.apiBaseUrl + '/sens_data/sensData/' + `/${_id}` , this.AuthHeader);
}
getAllData() {
  return this.http.get(environment.apiBaseUrl + '/sens_data/sensAllData' , this.AuthHeader);
}
// tslint:disable-next-line:variable-name
deleteData(_id: string) {
  return this.http.delete(environment.apiBaseUrl + '/sens_data/sensData/' + `/${_id}` , this.AuthHeader);
}
deleteAllData() {
  return this.http.delete(environment.apiBaseUrl + '/sens_data/sensAllData' , this.AuthHeader);
}
}
