// src/types.ts
export interface Question {
    [key: string]: string;
}

export interface Response {
    enfance: string;
    maintenant: string;
}

export interface Responses {
    [key: string]: Response;
}
