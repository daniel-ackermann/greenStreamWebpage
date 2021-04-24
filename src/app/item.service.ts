import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/typings';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { LoginRequestService } from './loginRequest.service';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class ItemService implements OnInit {
    items: Item[] = [];
    recommended: Item[] = [];
    loading: boolean = true;
    moreAvailable: boolean = false;
    selectedTopics: number[] = [];
    loadedTopic: string = environment.itemsPath;
    loadedSearchText: string = "";
    start = 10;

    constructor(private http: HttpClient, private loginService: LoginService, private loginRequestService: LoginRequestService, private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.load(environment.itemsPath, 20, 0);
    }

    getItems(): Item[] {
        return this.items;
    }

    isLoading(): boolean {
        return this.loading;
    }

    moreItemsAvailable(): boolean {
        return this.moreAvailable;
    }

    loadMore(type: string, limit: number = 10, start: number = this.start) {
        this.loadItems(type, limit, start).subscribe((data: Item[]) => {
            this.items = this.items.concat(data);
        });
    }
    load(type: string, limit: number = 10, start: number = this.start, searchText: string = "") {
        return this.loadItems(type, limit, start, searchText).pipe(
            tap((data: Item[]) => {
                this.items = data;
            }),
            catchError((err) => {
                console.log(err);
                if (!this.loginService.isLoggedIn) {
                    return this.loginRequestService.requestLogin().then((user) => {
                        this.load(type, limit, start, searchText);
                    }).catch(() => {
                        this.router.navigate(['list', 'all']);
                    });
                }
            })
        )
    }

    loadItems(type: string, limit: number = 10, start: number = this.start, searchText: string = ""): Observable<Item[]> {
        this.start = start;
        this.loadedTopic = type;
        this.loadedSearchText = searchText;
        const url = `${environment.apiMainUrl}/${type}/${limit + 1}/${start}${this.loadedSearchText}?topics=${this.selectedTopics}`;
        return this.http.get<Item[]>(url).pipe(
            tap((data: Item[]) => {
                if (data.length > 0) {
                    if (data.length > limit) {
                        data.pop();
                        this.moreAvailable = true;
                    } else {
                        this.moreAvailable = false;
                    }
                } else {
                    this.moreAvailable = false;
                }
                this.loading = false;
                return data;
            })
        );
    }
    add(item: Item): Observable<Item> {
        return this.http.post<Item>(`${environment.apiMainUrl}/${environment.itemPath}`, item).pipe(
            tap(_ => {
                this.items.push(item);
            }),
            catchError(this.handleError<Item>(`failed ${item}`))
        )
    }

    delete(id: number) {
        this.http.delete(`${environment.apiMainUrl}/${environment.itemPath}/${id}`).subscribe((err) => {
            console.log(err);
        });
        this.removeFromList(id);
    }

    updateStatus(id: number, type: string) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                let value;
                let url = `${environment.apiMainUrl}/${environment.itemPath}/status/${type}/${id}`;
                if (this.items[i][type] === null) {
                    this.items[i][type] = Math.floor(new Date().getTime() / 1000);
                    if (type === "liked") {
                        this.items[i].likes += 1;
                    }
                    this.http.put(url, {}).subscribe();
                } else {
                    this.items[i][type] = null;
                    if (type === "liked") {
                        this.items[i].likes -= 1;
                    }
                    this.http.delete(url, {}).subscribe();
                }
            }
        }
    }

    put(item: Item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i] = item;
            }
        }
        return this.http.put<Item>(`${environment.apiMainUrl}/${environment.itemPath}/${item.id}`, item).pipe(
            tap(_ => console.log(`fetched item id=${item.id}`)),
            catchError(this.handleError<Item>(`getItem id=${item.id}`))
        )
    }

    review(id: number) {
        this.removeFromList(id);
        return this.http.get(`${environment.apiMainUrl}/${environment.reviewItemPath}/${id}`).subscribe();
    }

    getItem(id: number): Observable<Item> {
        const url = `${environment.apiMainUrl}/${environment.itemPath}/${id}`;
        return this.http.get<Item>(url).pipe(
            tap(_ => console.log(`fetched item id=${id}`)),
            catchError(this.handleError<Item>(`getItem id=${id}`))
        );
    }

    getRecommended(): Item[] {
        return this.recommended;
    }

    loadRecommended(counter: number): Observable<Item[]> {
        return this.http.get<Item[]>(`${environment.apiMainUrl}/${environment.recommendedItemPath}/${counter}`)
            .pipe(
                tap((data: Item[]) => {
                    this.recommended = data;
                }),
                catchError(this.handleError<Item[]>(`getRecommended counter=${counter}`))
            );
    }

    setTopics(topics: number[]) {
        this.selectedTopics = topics;
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // if(error.status === 401){
            //     this.loginRequestService.requestLogin().then(() => {
            //         // loadItems();
            //     }).catch(err => {
            //         this.loginService.doLogout();
            //         this.router.navigate(['list']);
            //     });
            // }

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    removeFromList(id: number) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }
}