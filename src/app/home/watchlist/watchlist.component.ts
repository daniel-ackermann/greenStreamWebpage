import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { LoginRequestService } from 'src/app/loginRequest.service';
import { TitleService } from 'src/app/title.service';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {

    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle("Watch Later");
    }

    ngOnInit(): void {
        this.itemService.load("api/items/watchlist", 15, Math.floor(new Date().getTime() / 1000)).subscribe();
    }
}
