import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalStatus } from '../globalStatus';
import { ItemService } from '../item.service';
import { Item, Topic, Type } from 'src/typings';


@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
    mainUrl = "http://localhost:4200";
    title = "Hinzufügen";
    item = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        id: new FormControl(),
        likes: new FormControl(0),
        url: new FormControl(''),
        explanation_id: new FormControl(0),
        type_id: new FormControl(1),
        topic_id: new FormControl(1),
        language: new FormControl(),
        simple: new FormControl(0),
        // not set for each item, but for each type
        view_external: new FormControl(),
        name: new FormControl()
    });
    constructor(public globalStatus: GlobalStatus, private http: HttpClient, private route: ActivatedRoute, private router: Router, private itemService: ItemService) {}
    id: number;
    topics:Topic[] = [];
    types:Type[] = [];

    ngOnInit(): void {
        this.http.get<Topic[]>(`${this.mainUrl}/api/topics`).subscribe({
            error: (err) => {
                console.error(err);
            },
            next: (data: Topic[]) => {
                this.topics = data;
            }
        })
        this.http.get<Type[]>(`${this.mainUrl}/api/types`).subscribe({
            error: (err) => {
                console.error(err);
            },
            next: (data: Type[]) => {
                this.types = data;
            }
        })
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || undefined;
        if (this.id == undefined) {
            console.log("new Item");
        }else{
            this.title = "Bearbeiten";
            this.itemService.getItem(this.id).subscribe((data: Item) => {
                console.log(data[0]);
                this.item.setValue(data[0]);
            });
        }
    }

    save() {
        const newItem = this.item.getRawValue();
        delete newItem.view_external;
        delete newItem.name;
        console.log("save");
        if(this.id == undefined){
            this.itemService.add(newItem).subscribe(err => {
                console.log(err);
            });
        }else{
            this.itemService.put(newItem).subscribe(err => {
                console.log(err);
            });
        }
    }
}
