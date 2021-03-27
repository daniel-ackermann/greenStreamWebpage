import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from 'src/app/item.service';
import { LoginService } from 'src/app/login.service';
import { LoginRequestService } from 'src/app/loginRequest.service';
import { environment } from 'src/environments/environment';
import { Category, Item, Topic } from 'src/typings';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    allSelected: boolean = false;
    showNoItemHint: boolean = false;
    moreItemsAvailable: boolean = true;
    topics: Topic[] = [];
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
        "watchlist": {
            requiresAuth: true,
            pattern: "watchlist",
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

        // load category according to route
        const foo = this.route.snapshot.paramMap.get('topic');
        this.switchView(this.categories[foo || "all"]);

        // switch page on logout
        this.loginService.onStatusChange.subscribe((loggedIn) => {
            if (loggedIn === false) {
                this.switchView(this.categories["all"]);
            }
        });
        this.route.paramMap.subscribe((params) => {
            this.switchView(this.categories[params.get('topic') || "all"]);
        });
    }

    ngOnInit(): void {
    }

    // load category into view, request login or redirect
    switchView(index: Category) {
        console.log(index);
        this.selected = index.pattern;
        this.itemService.load(index.url, 15, 0).subscribe({
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
        this.itemService.load(this.itemService.loadedTopic, limit, index).subscribe();
    }

    submit() {
        this.loadCategory(20, 0);
    }
}
