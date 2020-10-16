export interface Item{
    title: string;
    description: string;
    likes: number;
    url: string;
    id: number;
}

export interface Topic{
    id: number;
    topic: string;
}

export interface Type{
    id: number;
    type: string;
}

export interface InputError{
    valid: boolean;
    message: string;
}