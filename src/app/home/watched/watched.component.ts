import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { TitleService } from 'src/app/title.service';

@Component({
    selector: 'app-watched',
    templateUrl: './watched.component.html',
    styleUrls: ['./watched.component.css']
})
export class WatchedComponent implements OnInit {

    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle("Watch Later");
    }

    ngOnInit(): void {
        this.itemService.load("api/items/watched", 15, Math.floor(new Date().getTime() / 1000)).subscribe();
    }
}
