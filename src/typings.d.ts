export interface Item {
    title: string;
    description: string;
    likes: number;
    url: string;
    id: number;
    reviewed?:number;
    liked?: boolean;
    watchlist?: boolean;
    created_by_id?: number;
}

export interface Topic {
    id: number;
    topic: string;
}

export interface Type {
    id: number;
    type: string;
}

export interface InputError {
    valid: boolean;
    message: string;
}

export interface User {
    id: number;
    email: string;
    role: string;
    language: string[];
    username?: string;
}

export interface Language {
    value: string;
    name: string;
}

export interface Feedback { 
    id?: number;
    information_id: number;
    feedback:string;
    created_by_id?: number;
}

export interface Status {
    id: number;
    liked?: boolean;
    watchlist?: boolean;
}