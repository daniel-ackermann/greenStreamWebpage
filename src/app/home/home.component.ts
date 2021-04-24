import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item, Topic } from "src/typings";
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../title.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
    selector: 'app-list',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    allSelected: boolean = false;
    showNoItemHint: boolean = false;
    moreItemsAvailable: boolean = true;
    topics: Topic[] = [];
    selection: FormGroup;
    recommended: Item[] = [];
    trending: Item[] = [];
    recommendedId = 1;

    constructor(
        public itemService: ItemService,
        public loginService: LoginService,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        public router: Router,
        private route: ActivatedRoute,
        public titleService: TitleService
    ) {

        // topic form 
        this.selection = this.formBuilder.group({
            topics: new FormArray([])
        });

        this.loginService.onStatusChange.subscribe((loggedIn) => {
            if (loggedIn === false) {
                this.router.navigate(['list', 'all']).then((e) => {
                    // if 'all' is already focused, reload to remove user_data
                    if(e === null){
                        this.itemService.load(this.itemService.loadedTopic, 16, this.itemService.start, this.itemService.loadedSearchText).subscribe();
                    }
                })
            } else {
                this.itemService.load(this.itemService.loadedTopic, 16, this.itemService.start, this.itemService.loadedSearchText).subscribe();
            }
        });
    }

    get selectionFormArray() {
        return this.selection.get('topics') as FormArray;
    }


    get selectedTopicIds() {
        return this.selection.value.topics.map(topic => topic.selected ? topic.id : null).filter(x => x !== null);
    }

    ngOnInit() {

        // load topics into form
        this.http.get<Topic[]>(`${environment.apiMainUrl}/${environment.topicsPath}`).subscribe((data) => {
            this.topics = data;
            data.forEach((topic) => {
                topic.selected = false;
                this.selectionFormArray.push(this.formBuilder.group(topic));
            });
        });
        this.http.get<Item[]>(`${environment.apiMainUrl}/${environment.collectionItems}/${this.recommendedId}`)
        .subscribe({
            next: (data) => {
                this.recommended = data;
            },
            error: (e) => {
                console.log(e);
            }
        });

        this.http.get<Item[]>(`${environment.apiMainUrl}/api/collection/trending`)
        .subscribe({
            next: (data) => {
                this.trending = data;
            },
            error: (e) => {
                console.log(e);
            }
        });
    }

    loadCategory(limit: number = 20, index: number = 0) {
        this.items = [];
        this.itemService.setTopics(this.selectedTopicIds);
        this.itemService.load(this.itemService.loadedTopic, limit, index, this.itemService.loadedSearchText).subscribe();
    }

    submit() {
        this.loadCategory();
    }

    selectAllTopics() {
        this.allSelected = !this.allSelected;
        this.selectionFormArray.patchValue(new Array(this.selectionFormArray.length).fill({ selected: this.allSelected }))
        this.loadCategory();
    }

    search() {
        this.itemService.load(`api/items/search`, 20, 0, `/${this.searchText}`).subscribe();
    }
}