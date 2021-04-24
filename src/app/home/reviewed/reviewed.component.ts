import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { TitleService } from 'src/app/title.service';

@Component({
  selector: 'app-reviewed',
  templateUrl: './reviewed.component.html',
  styleUrls: ['./reviewed.component.css']
})
export class ReviewedComponent implements OnInit {

    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle("Reviewed");
    }

    ngOnInit(): void {
        this.itemService.load("api/items/reviewed", 15, 0 ).subscribe();
    }
}
