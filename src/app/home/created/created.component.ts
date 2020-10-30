import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/typings';

@Component({
  selector: 'app-created',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.css']
})
export class CreatedComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    constructor(public itemService: ItemService) { }

    ngOnInit(): void {
        this.itemService.getCreatedItems().subscribe((data) => {
            console.log(data);
            this.items = data;
        });
    }
}
