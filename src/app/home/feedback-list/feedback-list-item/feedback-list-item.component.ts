import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
    feedbacks: Feedback[] = [];
    labels: Label[] = [];
    public labelsCollapsed = true;


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

    loadLabels() {
        const url = `${environment.apiMainUrl}/${environment.labelItemPath}/${this.item.id}`;
        return this.http.get<Label[]>(url);
    }

    deleteItem() {

    }

    resolveLabel(label: number, index: number, item: number) {
        console.log("setLabelDone:", label);
        this.http.post(`${environment.apiMainUrl}/${environment.setFeedbackDoneByLabel}`, { item: item, label: label }).subscribe((counter: number) => {
            console.log(counter);
            console.log(this.labels[index].count);
            this.labels[index].count -= counter;
            if(this.labels[index].count == 0){
                this.labels.splice(index, 1);
            }
        });
    }
    resolve(feedback: number, index: number) {
        this.feedbacks[index].done = !this.feedbacks[index].done;
        this.updateLabelCount(this.feedbacks[index].label, index);
        this.http.post(`${environment.apiMainUrl}/${environment.toggleFeedbackStatus}`, { id: feedback, status: this.feedbacks[index].done }).subscribe();
    }

    updateLabelCount(label: number, feedback: number) {
        let index = -1;
        for (let i = 0; i < this.labels.length; i++) {
            if (this.labels[i].id == label) {
                index = i;
                break;
            }
        }
        if (index < 0) {
            this.labels.push({
                id: this.feedbacks[feedback].label,
                color: this.feedbacks[feedback].color,
                count: 1,
                name: this.feedbacks[feedback].name,
            });
        } else {
            if (this.feedbacks[feedback].done) {
                this.labels[index].count -= 1;
                if(this.labels[index].count == 0){
                    this.labels.splice(index, 1);
                }
            } else {
                this.labels[index].count += 1;
            }
        }
    }
}
