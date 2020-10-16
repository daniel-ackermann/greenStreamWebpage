import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnInit } from '@angular/core';
import { Item } from 'src/typings';

import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ItemService implements OnInit {
    items;
    mainUrl = "http://localhost:4200";
    path = "api/items"
    constructor(private http: HttpClient) { }
    onRemove: Subject<number> = new Subject<number>();
    onEdit: Subject<Item> = new Subject<Item>();
    onAdd: Subject<Item> = new Subject<Item>();

    ngOnInit() {
    }

    remove(id: number) {
        this.onRemove.next(id);
        this.http.delete(`${this.mainUrl}/${this.path}/${id}`).subscribe((err) => {
            console.log(err);
        });
    }

    getItems() {
        return this.http.get<[Item]>(`${this.mainUrl}/${this.path}`).pipe(
            tap(_ => console.log('fetched items')),
            catchError(this.handleError<Item[]>('getItems', []))
        );
    }

    getItem(id: number): Observable<Item> {
        const url = `${this.mainUrl}/${this.path}/${id}`;
        return this.http.get<Item>(url).pipe(
            tap(_ => console.log(`fetched item id=${id}`)),
            catchError(this.handleError<Item>(`getItem id=${id}`))
        );
    }

    put(item:Item): Observable<Item>{
        this.onEdit.next(item);
        return this.http.put<Item>(`${this.mainUrl}/${this.path}/${item.id}`, item).pipe(
            tap(_ => console.log(`fetched item id=${item.id}`)),
            catchError(this.handleError<Item>(`getItem id=${item.id}`))
        )
    }

    add(item:Item){
        return this.http.post<Item>(`${this.mainUrl}/${this.path}`, item).pipe(
            tap(_ => {
                console.log(`added item id=${item.id}`)
                this.onAdd.next(item);
            }),
            catchError(this.handleError<Item>(`failed ${item}`))
        )
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}