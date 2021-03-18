import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { LoginRequestService } from 'src/app/loginRequest.service';
import { Item } from 'src/typings';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
    searchText = "";
        items: Item[] = [];
    showNoItemHint: boolean = false;
    constructor(
        public itemService: ItemService,
        private loginService: LoginService,
        private loginRequestService: LoginRequestService,
        private router: Router) { }

    ngOnInit(): void {

        this.requestItems();
        this.loginService.onStatusChange.subscribe(status => {
            if (status === false) {
                this.loginRequestService.requestLogin().then(() => {
                    this.requestItems();
                }).catch(err => {
                    this.router.navigate(['list']);
                });
            }
        })
        this.itemService.onRemove.subscribe((id: number) => {
            this.remove(id);
        });
        this.itemService.onEdit.subscribe((item: Item) => {
            this.replace(item);
        });
        this.itemService.onAdd.subscribe((item: Item) => {
            this.items.push(item);
        });
        this.loginService.onLanguageChange.subscribe((language: string[]) => {
            this.requestItems();
        });
    }
    requestItems(){
        this.itemService.getWatchListItems().subscribe((data) => {
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

    replace(item: Item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i] = item;
            }
        }
    }
}
