import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/typings';
import { GlobalStatus } from '../globalStatus';
import { ItemService } from '../item.service';
import { ListComponent } from '../list/list.component';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

    constructor(public globalStatus: GlobalStatus, private itemService: ItemService, private itemList: ListComponent) { }
    @Input() item: any;

    ngOnInit(): void {
    }

    deleteItem(id:number){
        this.itemService.remove(id);
        this.itemList.remove(id);
    }
}
