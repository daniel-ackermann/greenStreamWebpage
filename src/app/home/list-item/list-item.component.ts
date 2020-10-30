import { Component, Input } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

    constructor(public loginService: LoginService, private itemService: ItemService, public router: Router) { }
    @Input() items: any;
    @Input() searchText: any;

    deleteItem(id:number){
        this.itemService.remove(id);
    }
}
