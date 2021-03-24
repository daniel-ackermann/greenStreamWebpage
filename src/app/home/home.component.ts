import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Category, Item, Language, Topic } from "src/typings";
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginRequestService } from 'src/app/loginRequest.service';
import { ActivatedRoute, ActivationStart, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    showNoItemHint: boolean = false;
    moreItemsAvailable: boolean = true;
    topics: Topic[] = [];
    selection: FormGroup;
    selected: string = "all";
    // I would prefer an array, but I did not find any other working solution.
    // Problem was to get the array information by the pattern in the uri. I do want words and not numbers there.
    categories = {
        "all": {
            requiresAuth: false,
            pattern: "all",
            name: "Feed",
            url: environment.itemsPath,
            title: "Overview"
        },
        "created": {
            requiresAuth: true,
            pattern: "created",
            name: "Created",
            url: environment.createdItemsPath,
            title: "Created"
        },
        "liked": {
            requiresAuth: true,
            pattern: "liked",
            name: "Liked",
            url: environment.likedItemsPath,
            title: "Liked"
        },
        "watchlater": {
            requiresAuth: true,
            pattern: "watchlater",
            name: "Later",
            url: environment.watchListItemsPath,
            title: "Watch later"
        },
        "history": {
            requiresAuth: true,
            pattern: "history",
            name: "History",
            url: environment.watchedItemsPath,
            title: "History"
        },
        "reviewed": {
            requiresAuth: true,
            pattern: "reviewed",
            name: "Reviewed",
            url: environment.reviewedItemsPath,
            title: "Reviewed"
        },
        "review": {
            requiresAuth: true,
            pattern: "review",
            name: "Review",
            url: environment.reviewItemsPath,
            title: "Review"
        }
    };
    
    constructor(public itemService: ItemService,
        public loginService: LoginService,
        private loginRequestService: LoginRequestService,
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router) {
        
        // topic form 
        this.selection = this.formBuilder.group({
            topics: new FormArray([])
        });

        // load category according to route
        const foo = this.route.snapshot.paramMap.get('topic');
        this.switchView(this.categories[foo]);

        // switch page on logout
        this.loginService.onStatusChange.subscribe((loggedIn) => {
            if(loggedIn === false){
                this.switchView(this.categories["all"]);
            }
        });
        this.router.events.subscribe((event: RouterEvent) => {
            if(event instanceof ActivationStart && event.snapshot.params.topic){
                this.switchView(this.categories[event.snapshot.params.topic]);
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

    // load category into view, request login or redirect
    switchView(index: Category) {
        this.selected = index.pattern;
        this.itemService.load(index.url, this.selectedTopicIds, 10, 0).subscribe({
            error:(err) => {
                console.log(err);
                if(index.requiresAuth && !this.loginService.isLoggedIn){
                    return this.loginRequestService.requestLogin().then((user) => {
                        this.switchView(index)
                    }).catch(() => {
                        this.router.navigate(['list', 'all']);
                    });
                }
            }
        }); 
    }

    loadCategory(limit: number = 20, index: number = 0) {
        this.items = [];
        this.itemService.load(this.itemService.loadedTopic, this.selectedTopicIds, limit, index).subscribe();
    }

    submit() {
        this.loadCategory(20, 0);
    }
}