import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from "src/typings";
import { LoginService } from '../login.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
    searchText = "";
    items:Item[];
    constructor(public itemService: ItemService, private loginService: LoginService){}

    ngOnInit(){
        this.getItems();
        this.itemService.onRemove.subscribe((id:number) => {
            this.remove(id);
        });
        this.itemService.onEdit.subscribe((item:Item) => {
            this.replace(item);
        });
        this.itemService.onAdd.subscribe((item:Item) => {
            this.items.push(item);
        });
        this.loginService.onLanguageChange.subscribe((language: string) => {
            this.getItems();
        });
    }

    getItems(){
        this.itemService.getItems().subscribe(data => {
            this.items = data;
        });
    }
    remove(id:number){
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].id === id){
                this.items.splice(i,1);
            }
        }
    }

    replace(item:Item){
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].id === item.id){
                this.items[i] = item;
            }
        }
    }
}