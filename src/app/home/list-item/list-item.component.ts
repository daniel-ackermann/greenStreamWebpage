import { Component, Input } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from 'src/typings';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

    constructor(public loginService: LoginService, private itemService: ItemService, public router: Router, private http: HttpClient) { }
    @Input() items: any;
    @Input() searchText: any;

    deleteItem(id:number){
        this.itemService.remove(id);
    }

    updateStatus(data:any, index:number, remove: boolean = false){
        this.http.post(`${environment.apiMainUrl}/${environment.toggleLikePath}`, data).subscribe();
        this.items[index].liked = !this.items[index].liked;
        if(remove){
            delete this.items[index];
        }
    }
}
