import { Component, Input } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item, Status } from 'src/typings';
import { LoginRequestService } from 'src/app/loginRequest.service';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.css']
})
export class ListItemComponent {

    constructor(
        public loginService: LoginService,
        private loginRequestService: LoginRequestService,
        private itemService: ItemService,
        public router: Router,
        private http: HttpClient) { }
    @Input() items: Item[];
    @Input() loading: boolean;

    deleteItem(id: number) {
        this.itemService.delete(id);
    }

    updateStatus(id: number, type: string) {
        if (this.loginService.isLoggedIn) {
            this.itemService.updateStatus(id, type);
        } else {
            this.loginRequestService.requestLogin().then(() => {
                this.itemService.updateStatus(id, type);
            }).catch(() => { })
        }
    }

    openItem(url: string, id: number, index: number) {
        window.open(url, "_blank", "noopener noreferrer");
        this.itemService.updateStatus(id, 'watched');
    }
}
