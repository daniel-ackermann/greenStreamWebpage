import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { TitleService } from 'src/app/title.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle("Feed");
    }

    ngOnInit(): void {
        this.itemService.load("api/items", 15, 0).subscribe();
    }
}
