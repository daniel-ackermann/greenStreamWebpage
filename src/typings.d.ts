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
    selected?: boolean| number;
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
    languages: Language[];
    username?: string;
    topics: Topic[];
}

export interface Language {
    code: string;
    name: string;
    selected?: boolean;
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
    watched?: boolean;
}