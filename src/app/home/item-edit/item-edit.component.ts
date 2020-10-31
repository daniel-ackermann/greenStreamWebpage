import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { Item, Language, Topic, Type } from 'src/typings';
import { environment } from "src/environments/environment";
import { LoginService } from 'src/app/login.service';
import { LoginRequestService } from 'src/app/loginRequest.service';

@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
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
        language: new FormControl("de"),
        simple: new FormControl(0),
        reviewed: new FormControl(0),
        // not set for each item, but for each type
        view_external: new FormControl(),
        name: new FormControl()
    });
    constructor(    private http: HttpClient,
                    private route: ActivatedRoute,
                    private router: Router,
                    private itemService: ItemService,
                    public loginService: LoginService,
                    private loginRequestService: LoginRequestService,
                    private location: Location
                    ) {
                        this.loginService.onStatusChange.subscribe((loggedIn) => {
                            if(loggedIn === false){
                                this.loginRequestService.requestLogin().catch(() => {
                                    this.router.navigate(['/']);
                                })
                            }
                        });
                    }
    id: number;
    topics:Topic[] = [];
    types:Type[] = [];
    languages:Language[] = [{
            name: "Deutsch",
            value: "de"
        },
        {
            name: "English",
            value: "en"
        }
    ];

    ngOnInit(): void {
        this.http.get<Topic[]>(`${environment.apiMainUrl}/${environment.topicsPath}`).subscribe((data: Topic[]) => {
            this.topics = data;
        })
        this.http.get<Type[]>(`${environment.apiMainUrl}/${environment.typesPath}`).subscribe((data: Type[]) => {
            this.types = data;
        })
        this.http.get<Language[]>(`${environment.apiMainUrl}/${environment.languagesPath}`).subscribe((data: Language[]) => {
            this.languages = data;
        })
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10) || undefined;
        if (this.id === undefined) {
            console.log("new Item");
        }else{
            this.title = "Bearbeiten";
            this.itemService.getItem(this.id).subscribe((data: Item) => {
                this.item.setValue(data[0]);
            });
        }
    }

    save() {
        const newItem = this.item.getRawValue();
        delete newItem.view_external;
        delete newItem.name;
        console.log("save");
        if(this.id === undefined){
            this.itemService.add(newItem).subscribe(err => {
                console.log("err");
            });
        }else{
            this.itemService.put(newItem).subscribe(err => {
                console.log("err");
            });
        }
        this.location.back();
    }

    close(){
        this.location.back();
    }
}
