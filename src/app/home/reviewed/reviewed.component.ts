import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { Item } from 'src/typings';

@Component({
    selector: 'app-reviewed',
    templateUrl: './reviewed.component.html',
    styleUrls: ['./reviewed.component.css']
})
export class ReviewedComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    constructor(public itemService: ItemService, private router: Router, private loginService: LoginService) { }

    ngOnInit(): void {
        if(!this.loginService.isLoggedIn){
            this.router.navigate(['']);
        }
        this.itemService.getReviewedItems().subscribe((data) => {
            console.log(data);
            this.items = data;
        });
    }

}
