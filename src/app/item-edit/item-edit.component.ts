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
import { catchError, tap } from 'rxjs/operators';

@Component({
    selector: 'app-item-edit',
    templateUrl: './item-edit.component.html',
    styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
    title = "Hinzufügen";
    id: number;
    topics:Topic[] = [];
    types:Type[] = [];
    languages:Language[] = [];
    isLoading: boolean = false;
    item = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        id: new FormControl(),
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
                    ) {}

    ngOnInit(): void {

        this.loginService.onStatusChange.subscribe((loggedIn) => {
            if(loggedIn === false){
                this.loginRequestService.requestLogin().catch(() => {
                    this.router.navigate([{outlets: {'itemModal': null}}]);
                })
            }
        });
        this.loginService.isSignedIn().catch(() => {
            this.loginRequestService.requestLogin().catch(() => {
                this.router.navigate([{outlets: {'itemModal': null}}]);
            })
        });

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
            this.isLoading = true;
            this.itemService.getItem(this.id).subscribe((data: Item) => {
                this.isLoading = false;
                this.item.patchValue(data);
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
        
        // It was broken: https://github.com/angular/angular/issues/13523
        // Should now work, but does not with (11.2.5): https://github.com/angular/angular/issues/13523
        // this.router.navigate([
        //         { outlets: { itemModal: null } }
        //     ]
        // );
        
        // the workaround is but does not work on page reload: If you follow a link you can close the auth-window and the modal remains visible. 
        this.location.back();

    }
}
