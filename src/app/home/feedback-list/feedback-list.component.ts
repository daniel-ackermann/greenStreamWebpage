import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from 'src/app/login.service';
import { environment } from 'src/environments/environment';
import { Feedback } from 'src/typings';

@Component({
    selector: 'app-feedback-list',
    templateUrl: './feedback-list.component.html',
    styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
    feedbacks:Feedback[] = [];
    searchText: string = "";
    loading: boolean = true;
    moreAvailable: boolean = true;
    constructor(private http: HttpClient, public loginService: LoginService) { }

    ngOnInit(): void {
        this.load([], 20, 0);
    }

    loadMore(topics: number[] = [], limit: number = 10, start: number = 0) {
        this.loadFeedbacks(topics, limit, start).subscribe((data: Feedback[]) => {
            this.feedbacks = this.feedbacks.concat(data);
        });
    }

    load(topics: number[] = [], limit: number = 10, start: number = 0) {
        console.log("FeedbackService.load");
        this.loadFeedbacks(topics, limit, start).subscribe((data: Feedback[]) => {
            console.log(data);
            this.feedbacks = data;
        });
    }

    loadFeedbacks(topics: number[] = [], limit: number = 10, start: number = 0): Observable<Feedback[]> {
        const url = `${environment.apiMainUrl}/${environment.feedbacksPath}/${limit + 1}/${start}?topics=${topics}`;
        console.log("FeedbackService.loadFeedbacks");
        return this.http.get<Feedback[]>(url).pipe(
            tap((data: Feedback[]) => {
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
}
