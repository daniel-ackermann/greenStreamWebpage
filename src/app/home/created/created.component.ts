import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { LoginRequestService } from 'src/app/loginRequest.service';
import { TitleService } from 'src/app/title.service';

@Component({
    selector: 'app-created',
    templateUrl: './created.component.html',
    styleUrls: ['./created.component.css']
})
export class CreatedComponent implements OnInit {

    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private titleService: TitleService
    ) {
        this.titleService.setTitle("Created");
    }

    ngOnInit(): void {
        this.itemService.load("api/items/created", 15, Math.floor(new Date().getTime() / 1000)).subscribe();
    }
}
