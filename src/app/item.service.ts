import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Item } from 'src/typings';

import { catchError, tap } from 'rxjs/operators';
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
    loading: boolean = true;
    moreAvailable: boolean = false;
    selectedTopics: number[] = [];
    loadedTopic: string = environment.itemsPath;

    constructor(private http: HttpClient, private loginService: LoginService, private loginRequestService: LoginRequestService, private router: Router) {}

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

    loadMore(type: string, limit: number = 10, start: number = 0) {
        this.loadItems(type, limit, start).subscribe((data: Item[]) => {
            this.items = this.items.concat(data);
        });
    }
    load(type: string, limit: number = 10, start: number = 0) {
        return this.loadItems(type, limit, start).pipe(tap((data: Item[]) => {
            this.items = data;
        }))
    }

    loadItems(type: string, limit: number = 10, start: number = 0): Observable<Item[]> {
        this.loadedTopic = type;
        const url = `${environment.apiMainUrl}/${type}/${limit + 1}/${start}?topics=${this.selectedTopics}`;
        return this.http.get<Item[]>(url).pipe(
            tap((data: Item[]) => {
                console.log('fetched items')
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
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
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
        return this.http.get(`${environment.apiMainUrl}/${environment.reviewItemsPath}/${id}`).subscribe();
    }

    getItem(id: number): Observable<Item> {
        const url = `${environment.apiMainUrl}/${environment.itemPath}/${id}`;
        return this.http.get<Item>(url).pipe(
            tap(_ => console.log(`fetched item id=${id}`)),
            catchError(this.handleError<Item>(`getItem id=${id}`))
        );
    }

    setTopics(topics: number[]){
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
}