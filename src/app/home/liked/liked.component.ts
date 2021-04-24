import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { TitleService } from 'src/app/title.service';

@Component({
    selector: 'app-liked',
    templateUrl: './liked.component.html',
    styleUrls: ['./liked.component.css']
})
export class LikedComponent implements OnInit {

    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle("Liked");
    }

    ngOnInit(): void {
        this.itemService.load("api/items/liked", 15, Math.floor(new Date().getTime() / 1000)).subscribe();
    }
}
