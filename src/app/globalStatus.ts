import { Injectable } from '@angular/core';
@Injectable()
export class GlobalStatus {
    constructor() { }
    public loggedIn: boolean = false;
    public username: string = "";
}