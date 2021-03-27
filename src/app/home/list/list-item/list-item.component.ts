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

    updateStatus(data: Status, index: number, remove: boolean = false) {
        if (this.loginService.isLoggedIn) {
            this.setStatus(data, index, remove);
        } else {
            this.loginRequestService.requestLogin().then(() => {
                this.setStatus(data, index, remove);
            }).catch(() => { })
        }
    }

    openItem(url: string, id: number, index: number) {
        window.open(url, "_blank", "noopener noreferrer");
        this.setStatus({ id: id, watched: true }, index);
    }

    setStatus(data: Status, index: number, remove: boolean = false) {
        this.http.post(`${environment.apiMainUrl}/${environment.toggleLikePath}`, data).subscribe();
        if (typeof data.liked !== 'undefined' && this.items[index].liked != data.liked) {
            this.items[index].liked = data.liked;
            if (data.liked) {
                this.items[index].likes += 1;
            } else {
                this.items[index].likes -= 1;
            }
        }
        if (typeof data.watchlist !== 'undefined' && this.items[index].watchlist != data.watchlist) {
            this.items[index].watchlist = data.watchlist;
            if (data.watchlist) {
                this.items[index].marked += 1;
            } else {
                this.items[index].marked -= 1;
            }
        }
        if (remove) {
            delete this.items[index];
        }
    }
}
