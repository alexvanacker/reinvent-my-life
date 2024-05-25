// src/types.ts
export interface Question {
    [key: number]: string;
}

export interface Response {
    enfance: number;
    maintenant: number;
}

export interface Responses {
    [key: number]: Response;
}
