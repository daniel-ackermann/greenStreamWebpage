import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item } from 'src/typings';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

    constructor(
        private itemService: ItemService
    ) { }
    @Input() collection: Item[];
    @Input() title: string;

    ngOnInit(): void {}

    openItem(url: string, id: number, index: number) {
        window.open(url, "_blank", "noopener noreferrer");
        this.itemService.updateStatus(id, 'watched');
    }
}
