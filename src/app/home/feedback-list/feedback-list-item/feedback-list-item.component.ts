import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
import { Feedback, Item, Label } from 'src/typings';

@Component({
    selector: 'app-feedback-list-item',
    templateUrl: './feedback-list-item.component.html',
    styleUrls: ['./feedback-list-item.component.css']
})
export class FeedbackListItemComponent implements OnInit {

    constructor(
        public loginService: LoginService,
        private http: HttpClient
    ) { }
    @Input() item: Item;
    @Input() index: number;
    @Input() loading: boolean;
    feedbacks: Feedback[];
    labels: Label[];
    public labelsCollapsed = true;

    public isCollapsed = true;

    ngOnInit(): void {
        this.loadFeedbacks().subscribe((data: Feedback[]) => {
            this.feedbacks = data;
        });
        this.loadLabels().subscribe((data: Label[]) => {
            console.log(data);
            this.labels = data;
        });
    }

    loadFeedbacks() {
        const url = `${environment.apiMainUrl}/${environment.feedbackItemsPath}/${this.item.id}`;
        console.log("FeedbackService.loadFeedbacks");
        return this.http.get<Feedback[]>(url);
    }
    
    loadLabels(){
        const url = `${environment.apiMainUrl}/${environment.labelItemPath}/${this.item.id}`;
        return this.http.get<Label[]>(url); 
    }

    deleteItem() {

    }


    deleteFeedback(id: number, index: number) {
        this.http.delete(`${environment.apiMainUrl}/${environment.deleteFeedbackPath}/${id}`).subscribe();
        this.feedbacks.splice(index, 1);
    }
    resolve(){}
}
