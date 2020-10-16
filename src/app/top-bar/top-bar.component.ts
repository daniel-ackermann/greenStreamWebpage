import { Component, OnInit } from '@angular/core';
import { GlobalStatus } from '../globalStatus';
import { LoginModal } from '../login/login.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

    constructor(public globalStatus: GlobalStatus) {}

    ngOnInit() {}

}