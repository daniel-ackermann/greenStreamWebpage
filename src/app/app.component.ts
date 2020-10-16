import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalStatus } from './globalStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {

    constructor(private http: HttpClient, private globalStatus: GlobalStatus){}

  ngOnInit(){
      this.http.get<boolean>('http://localhost:4200/login').subscribe({
          error: (error) => {

          },
          next: (data:boolean) => {
              this.globalStatus.loggedIn = data;
          }
      })
  }
}