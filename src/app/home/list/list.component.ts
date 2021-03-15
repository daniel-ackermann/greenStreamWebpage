import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from "src/typings";
import { LoginService } from 'src/app/login.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    showNoItemHint: boolean = false;
    loaded: boolean = false;
    constructor(public itemService: ItemService, private loginService: LoginService) { }

    ngOnInit() {
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
            this.itemService.getItems(20, 0).subscribe(data => {
                if(data.length > 0){
                    this.items = data;
                }else{
                    this.showNoItemHint = true;
                }
            });
        });
        this.getItems();
    }

    getItems(limit:number = 20, index: number = 0) {
        this.itemService.getItems(limit, index).subscribe(data => {
            if(data.length > 0){
                this.items = this.items.concat(data);
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