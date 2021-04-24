export interface Item {
    id: number;
    likes: number;
    marked: number;
    explanation_id?: number;
    url: string;
    description: string;
    title: string;
    simple?: boolean|number;
    reviewed?:number;
    public?: boolean; 
    position?: number
    type?: Type;
    topic?: Topic;
    language?: Language;
    liked?: number;
    watched?: number | null;
    watchlist?: number | null;
    last_recommended?: number | null;
    created_by_id?: number;
    created?:number;
    score?: number;
    readingDuration?: number;
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
    label: number;
    feedback:string;
    created_by_id?: number;
    done?: boolean;
    color?:string;
    name?: string;
}

export interface Status {
    id: number;
    liked?: boolean;
    watchlist?: boolean;
    watched?: boolean;
}

export interface Category {
    title: string,
    url: string,
    requiresAuth: boolean
}

export interface Label{
    name: string;
    color: string;
    count: number;
    id: number;
}

export interface PublicUser {
    id: number;
    name: string;
}

export interface Collection {
    id: number;
    title: string;
    language: string;
    owner: PublicUser;
    created: number;
    likes?: number;
}