import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-bottom-bar',
    templateUrl: './bottom-bar.component.html',
    styleUrls: ['./bottom-bar.component.css']
})
export class BottomBarComponent implements OnInit {
    constructor(public router: Router, private loginService: LoginService) {}
    version = environment.version;
    ngOnInit(): void {
    }
}
