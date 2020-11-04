export interface ValidationResponse {
    validationStatus: boolean;
    message?: string;
}
export declare function checkLoginStatus(): ValidationResponse;
export declare function getToken(): string;
export declare function setToken(token: string): void;
