import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle("Liked");
    }

    ngOnInit(): void {
        this.itemService.load("api/items/review", 15, 0 ).subscribe();
    }
}
