import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginRequestService } from '../loginRequest.service';
import { Language, Topic, User } from 'src/typings';


@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
    settings: FormGroup;

    get getLanguages() {
        return this.settings.get('selectedLanguages') as FormArray;
    }

    get getTopics(): FormArray {
        return this.settings.get('selectedTopics') as FormArray;
    }

    constructor(
        private http: HttpClient,
        public loginService: LoginService,
        private location: Location,
        public router: Router,
        private fb: FormBuilder,
        private loginRequestService: LoginRequestService) {
        
        
        this.settings = this.fb.group({
            username: new FormControl(this.loginService.user.username || ''),
            selectedLanguages: new FormArray([]),
            selectedTopics: new FormArray([]),
            email: new FormControl(this.loginService.user.email),
            role: new FormControl(this.loginService.user.role)
        });
    }

    async ngOnInit() {
        this.loginService.isSignedIn().then((user: User) => {
            this.initUser();
        }).catch(err => {
            this.loginRequestService.requestLogin().then(() => {
                this.initUser();
            }).catch(() => {
                this.router.navigate(['/']);
            })
        });
    }

    private initUser() {
        for(let i in this.loginService.user.topics){
            this.getTopics.push(this.fb.group(this.loginService.user.topics[i]));
        }
        for(let i in this.loginService.user.languages){
            this.getLanguages.push(this.fb.group(this.loginService.user.languages[i]));
        }

        this.settings.patchValue({
            username: this.loginService.user.username,
            email: this.loginService.user.email,
            role: this.loginService.user.role
        });
        
        this.loginService.onStatusChange.subscribe((status: boolean) => {
            if (!status) {
                this.router.navigate(['']);
            }
        });
    }

    submit() {
        const selectedLanguageIds = this.settings.value.selectedLanguages
            .map((lang: Language, i: number) => lang.selected ? lang.code : null)
            .filter(v => v !== null);
        const selectedTopicIds:number[] = this.settings.value.selectedTopics
            .map((topic: Topic) => topic.selected ? topic.id : null)
            .filter(v => v !== null);

        this.loginService.setUserName(this.settings.value.username);
        let user = {
            username: this.settings.value.username,
            languages: selectedLanguageIds,
            topics: selectedTopicIds
        }

        this.http.put(`${environment.apiMainUrl}/${environment.userPath}/${this.loginService.user.id}`, user).subscribe((data) => {
            console.log(data);
        });
        this.location.back();
    }

    deleteAccount() {
        this.loginService.deleteAccount().then(() => {
            this.location.back();
        })
    }
    close() {
        this.location.back();
    }
}
