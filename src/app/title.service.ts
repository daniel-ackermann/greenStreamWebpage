import { Injectable } from "@angular/core";

@Injectable()
export class TitleService {
    private title: string = "Overview";
    constructor() { }

    getTitle() {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }
}