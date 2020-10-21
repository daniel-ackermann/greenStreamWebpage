import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/typings';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{
    item:Item;
    constructor(public loginService: LoginService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
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
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10) || undefined;
        if(this.id === undefined){
            this.router.navigate(['item']);
        }
        this.http.get(`${environment.apiMainUrl}/${environment.itemsPath}/${this.id}`).subscribe((data: [Item]) => {
                if(data.length < 1){
                    this.router.navigate(['/']);
                }
                this.item = data[0];
        });
    }

}
