import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

@Injectable()
export class HomeComponent implements OnInit {
  ost = 'HEJ';  
  config: Config;
  headers;
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.config = {
      Id: 1,
      ProjectId: 'HILOJSA',
      BuildDate: new Date
    }
    this.fetchData();

    //this.getConfig();
    //this.getConfigResponse();
  }

  getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.httpClient.get<Config>(
      'https://sdk-pc23-vm.sdkdev.dk:9601/api/v1/dependencies', { observe: 'response' });
  }

  showConfigResponse() {
    this.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);
  
        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }


  getConfig() {
    return this.httpClient.get<Config>('https://sdk-pc23-vm.sdkdev.dk:9601/api/v1/dependencies');
  }

  showConfig() {
    this.getConfig().subscribe((data: Config) => this.config = {
      Id: data['Id'],
      ProjectId: data['ProjectId'],
      BuildDate: data['BuildDate']
    })
  }
  private fetchData() {
    let headers = new HttpHeaders(); 
    headers.set('Content-Type', 'application/json');
    const promise = this.httpClient.get('https://sdk-pc23-vm.sdkdev.dk:9601/api/v1/dependencies').toPromise();
    promise.then((data) => {console.log(data)}).catch((error) => {
      console.log('LORT')
    });
  }

  

}

class Config {
  Id: number;
  ProjectId: string;
  BuildDate: Date;
}
