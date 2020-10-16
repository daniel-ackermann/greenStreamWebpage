import { Component, OnInit } from '@angular/core';
import { GlobalStatus } from '../globalStatus';
import { ItemService } from '../item.service';
import { Item } from "../../typings";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
    searchText = "";
    items:Item[];
    constructor(public globalStatus:GlobalStatus, public itemService: ItemService){}

    ngOnInit(){
        this.itemService.getItems().subscribe(data => {
            this.items = data;
        });
        this.itemService.onRemove.subscribe((id:number) => {
            this.remove(id);
        });
        this.itemService.onEdit.subscribe((item:Item) => {
            this.replace(item);
        });
        this.itemService.onAdd.subscribe((item:Item) => {
            this.items.push(item);
        });
    }
    
    remove(id:number){
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].id == id){
                this.items.splice(i,1);
            }
        }
    }

    replace(item:Item){
        for(let i = 0; i < this.items.length; i++){
            if(this.items[i].id == item.id){
                this.items[i] = item;
            }
        }
    }
}