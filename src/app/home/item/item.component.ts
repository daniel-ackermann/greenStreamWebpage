import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback, Item, Status } from 'src/typings';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/login.service';
import { ItemModule } from './item.module';
import { ItemService } from 'src/app/item.service';
import { FormControl } from '@angular/forms';
import { LoginRequestService } from 'src/app/loginRequest.service';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
    item: Item;
    feedback: Feedback[] = [];
    feedbackText = new FormControl('');
    constructor(
        public loginService: LoginService,
        private loginRequestService: LoginRequestService,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private itemService: ItemService)
    {
        this.item = {
            title: '',
            likes: 0,
            description: '',
            url: '',
            id: undefined
        };
    }
    id: number;

    ngOnInit(): void {
        this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10) || undefined;
        if (this.id === undefined) {
            this.router.navigate(['item']);
        }
        this.http.get(`${environment.apiMainUrl}/${environment.itemPath}/${this.id}`).subscribe((data: Item[]) => {
            if (data.length < 1) {
                console.log("item not found");
                this.router.navigate(['/']);
            }
            this.item = data[0];
        });
        this.http.get(`${environment.apiMainUrl}/${environment.feedbackItemsPath}/${this.id}`).subscribe((data: Feedback[]) => {
            this.feedback = data;
        })
    }
    
    deleteFeedback(id: number, index: number) {
        this.http.delete(`${environment.apiMainUrl}/${environment.deleteFeedbackPath}/${id}`).subscribe();
        this.feedback.splice(index, 1);
    }

    addFeedback(){
        if(this.feedbackText.value == ""){
            return;
        }
        const newFeedback = {
            feedback: this.feedbackText.value,
            information_id: this.id
        };
        this.feedback.push(newFeedback);
        this.http.post(`${environment.apiMainUrl}/${environment.deleteFeedbackPath}`, newFeedback).subscribe();
        this.feedbackText.setValue('');
    }

    updateStatus(data: Status) {
        if (this.loginService.isLoggedIn) {
            this.setStatus(data);
        }else{
            this.loginRequestService.requestLogin().then(() => {
                this.setStatus(data);
            }).catch(() => {})
        }
    }

    setStatus(data: Status) {
        this.http.post(`${environment.apiMainUrl}/${environment.toggleLikePath}`, data).subscribe();
        if(typeof data.liked !== 'undefined'){
            this.item.liked = data.liked;
        }
        if(typeof data.watchlist !== 'undefined'){
            this.item.watchlist = data.watchlist;
        }
        this.itemService.put(this.item).subscribe();
    }

    close() {
        this.location.back()
    }

    openItem(item: Item){
        window.open(item.url, "_blank", "noopener noreferrer");
        this.updateStatus({id: this.item.id, watched: true});
    }

    review(id: number) {
        this.itemService.review(id);
        this.location.back()
    }
}
