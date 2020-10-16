import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item, Topic, Type } from 'src/typings';
import { GlobalStatus } from '../globalStatus';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{
    item:Item;
    mainUrl = "http://localhost:4200";
    constructor(public globalStatus: GlobalStatus, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
        this.item = {
            title: '',
            likes: 0,
            description: '',
            url: '',
            id: undefined
        };
    }
    id:number;

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id')) || undefined;
        if(this.id == undefined){
            this.router.navigate(['item']);
        }
        this.http.get(`${this.mainUrl}/api/items/${this.id}`).subscribe({
            error: (err) => {
                console.log(err);
            },
            next: (data: [Item]) => {
                if(data.length < 1){
                    this.router.navigate(['item']);
                }
                console.log(data);
                this.item = data[0];
            }
        });
    }

}
