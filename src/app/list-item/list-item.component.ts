import { Component, Input } from '@angular/core';
import { ItemService } from '../item.service';
import { ListComponent } from '../list/list.component';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

    constructor(public loginService: LoginService, private itemService: ItemService, private itemList: ListComponent) { }
    @Input() item: any;

    deleteItem(id:number){
        this.itemService.remove(id);
        this.itemList.remove(id);
    }
}
