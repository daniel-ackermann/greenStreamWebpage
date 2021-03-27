import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item, Topic } from "src/typings";
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

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
    selected: string = "/list/all";
    // I would prefer an array, but I did not find any other working solution.
    // Problem was to get the array information by the pattern in the uri. I do want words and not numbers there.
    categories = {
        "/list/all": {
            requiresAuth: false,
            pattern: "all",
            name: "Feed",
            title: "Overview"
        },
        "/list/created": {
            requiresAuth: true,
            pattern: "created",
            name: "Created",
            title: "Created"
        },
        "/list/liked": {
            requiresAuth: true,
            pattern: "liked",
            name: "Liked",
            title: "Liked"
        },
        "/list/watchlist": {
            requiresAuth: true,
            pattern: "watchlist",
            name: "Later",
            title: "Watch later"
        },
        "/list/history": {
            requiresAuth: true,
            pattern: "history",
            name: "History",
            title: "History"
        },
        "/list/reviewed": {
            requiresAuth: true,
            pattern: "reviewed",
            name: "Reviewed",
            title: "Reviewed"
        },
        "/list/review": {
            requiresAuth: true,
            pattern: "review",
            name: "Review",
            title: "Review"
        },
        "/list/feedback": {
            requiresAuth: true,
            pattern: "feedback",
            name: "Feedback",
            title: "Feedback"
        }
    };
    
    constructor(public itemService: ItemService,
        public loginService: LoginService,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router) {
        
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
        this.router.events.subscribe((data) => {
            if(data instanceof NavigationEnd){
                this.selected = data.urlAfterRedirects;
            }
        });
    }

    get selectionFormArray() {
        return this.selection.get('topics') as FormArray;
    }

    get categoryArray(){
        return Object.values(this.categories);
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
    
    selectAllCategories(){
        this.allSelected = !this.allSelected;
        this.selectionFormArray.patchValue(new Array(this.selectionFormArray.length).fill({selected: this.allSelected}))
        this.itemService.setTopics(this.selectedTopicIds);
        this.loadCategory();
    }
}