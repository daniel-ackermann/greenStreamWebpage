import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { Item } from 'src/typings';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
    searchText = "";
        items: Item[] = [];
    showNoItemHint: boolean = false;

    constructor(private loginService: LoginService, private router: Router, private itemService: ItemService) { }

    ngOnInit(): void {
        this.loginService.onStatusChange.subscribe(status => {
            if(!status){
                this.router.navigate(['']);
            }
        })
        this.itemService.getReviewItems().subscribe((data) => {
            if(data.length > 0){
                this.items = data;
            }else{
                this.showNoItemHint = true;
            }
        });
        this.itemService.onReview.subscribe((id:number)=> {
            this.remove(id);
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
