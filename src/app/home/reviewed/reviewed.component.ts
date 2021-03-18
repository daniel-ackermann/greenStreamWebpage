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
    showNoItemHint: boolean = false;
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
                    this.router.navigate(['list']);
                });
            }
        })
        this.itemService.onRemove.subscribe((id:number)=> {
            this.remove(id);
        });
    }
    requestItems(){
        this.itemService.getReviewedItems().subscribe((data) => {
            if(data.length > 0){
                this.items = data;
            }else{
                this.showNoItemHint = true;
            }
        });
    }
    remove(id: number) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }
}
