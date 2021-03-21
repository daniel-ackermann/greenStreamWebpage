import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/item.service';
import { Item, Language, Topic } from "src/typings";
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginRequestService } from 'src/app/loginRequest.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    searchText = "";
    items: Item[] = [];
    showNoItemHint: boolean = false;
    loading: boolean = true;
    moreItemsAvailable: boolean = true;
    topics: Topic[] = [];
    selection: FormGroup;
    constructor(public itemService: ItemService,
        private loginService: LoginService,
        private http: HttpClient,
        private formBuilder: FormBuilder) {
        this.selection = this.formBuilder.group({
            topics: new FormArray([])
        });
    }

    get selectionFormArray() {
        return this.selection.get('topics') as FormArray;
    }

    get selectedTopicIds(){
        return this.selection.value.topics.map((topic:Topic) => topic.selected ? topic.id : null ).filter(x => x !== null);
    }

    ngOnInit() {
        this.http.get<Topic[]>(`${environment.apiMainUrl}/${environment.topicsPath}`).subscribe((data) => {
            this.topics = data;
            data.forEach((topic) => {
                topic.selected = false;
                this.selectionFormArray.push(this.formBuilder.group(topic));
            });
        });
        this.itemService.onRemove.subscribe((id: number) => {
            this.remove(id);
        });
        this.itemService.onEdit.subscribe((item: Item) => {
            this.replace(item);
        });
        this.itemService.onAdd.subscribe((item: Item) => {
            this.items.push(item);
        });
        // this.loginService.onLanguageChange.subscribe((language: Language[]) => {
        //     this.itemService.getItems(this.selectedTopicIds, 20, 0).subscribe(data => {
        //         if (data.length > 0) {
        //             this.items = data;
        //             this.showNoItemHint = false;
        //         } else {
        //             this.showNoItemHint = true;
        //         }
        //         this.loading = false;
        //     });
        // });
        this.getItems();
    }

    getItems(limit: number = 20, index: number = 0) {
        this.loading = true;
        this.itemService.getItems(this.selectedTopicIds, limit, index).subscribe(data => {
            if (data.length > 0) {
                this.showNoItemHint = false;
                this.items = this.items.concat(data);
                if(data.length > 9){
                    data.pop();
                    this.moreItemsAvailable = true;
                }else{
                    this.moreItemsAvailable = false;
                }
            } else {
                this.moreItemsAvailable = false;
            }
            this.loading = false;
        });
    }

    loadCategory(limit: number = 20, index: number = 0) {
        this.items = [];
        this.getItems(limit, index);
    }

    remove(id: number) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === id) {
                this.items.splice(i, 1);
            }
        }
    }

    replace(item: Item) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].id === item.id) {
                this.items[i] = item;
            }
        }
    }

    submit(){
        this.loadCategory(20, 0);
    }
}