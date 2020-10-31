import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { LoginRequestService } from 'src/app/loginRequest.service';
import { Item } from 'src/typings';

@Component({
    selector: 'app-reviewed',
    templateUrl: './reviewed.component.html',
    styleUrls: ['./reviewed.component.css']
})
export class ReviewedComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    constructor(
        public itemService: ItemService,
        private router: Router,
        private loginService: LoginService,
        private loginRequestService: LoginRequestService) { }

    ngOnInit(): void {
        this.requestItems();
        this.loginService.onStatusChange.subscribe(status => {
            if (!status) {
                this.loginRequestService.requestLogin().then(() => {
                    this.requestItems();
                }).catch(err => {
                    this.router.navigate(['']);
                });
            }
        })
    }
    requestItems(){
        this.itemService.getReviewedItems().subscribe((data) => {
            this.items = data;
        });
    }
}
