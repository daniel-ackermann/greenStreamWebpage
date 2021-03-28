import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item, Topic } from "src/typings";
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TitleService } from '../title.service';

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
    
    constructor(public itemService: ItemService,
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

        // switch page on logout
        this.loginService.onStatusChange.subscribe((loggedIn) => {
            if(loggedIn === false){
                this.router.navigate(["all"]);
            }
        });
    }

    get selectionFormArray() {
        return this.selection.get('topics') as FormArray;
    }


    get selectedTopicIds(){
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
    }

    loadCategory(limit: number = 20, index: number = 0) {
        this.items = [];
        this.itemService.load(this.itemService.loadedTopic, limit, index).subscribe();
    }

    submit() {
        this.itemService.setTopics(this.selectedTopicIds);
        this.loadCategory(20, 0);
    }
    
    selectAllTopics(){
        this.allSelected = !this.allSelected;
        this.selectionFormArray.patchValue(new Array(this.selectionFormArray.length).fill({selected: this.allSelected}))
        this.itemService.setTopics(this.selectedTopicIds);
        this.loadCategory();
    }

    search(){
        this.itemService.load(`api/items/search`, 20, 0, `/${this.searchText}`).subscribe();
    }
}