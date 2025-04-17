export interface APIResponse<T = any> {
    data: T;
    message?: string;
    status: number;
}
export interface ErrorResponse {
    message: string;
    status: number;
}
export interface ConfigurationOptions {
    basePath: string;
    fetchApi?: typeof fetch;
}
export declare class Configuration {
    basePath: string;
    fetchApi?: typeof fetch | undefined;
    constructor(basePath: string, fetchApi?: typeof fetch | undefined);
}
export declare class AuthApi {
    private config;
    constructor(config: Configuration);
    authControllerCheckValidAccessToken(): Promise<APIResponse<{
        isValid: boolean;
    }>>;
}
export declare class DialoguesApi {
    private config;
    constructor(config: Configuration);
}
export declare class EmailVerificationApi {
    private config;
    constructor(config: Configuration);
}
export declare class ExpressionApi {
    private config;
    constructor(config: Configuration);
}
export declare class MoviesApi {
    private config;
    constructor(config: Configuration);
}
export declare class MyApi {
    private config;
    constructor(config: Configuration);
}
export declare class ScenesApi {
    private config;
    constructor(config: Configuration);
}
export declare class SpeakersApi {
    private config;
    constructor(config: Configuration);
}
export declare class StudyApi {
    private config;
    constructor(config: Configuration);
}
export declare class UsersApi {
    private config;
    constructor(config: Configuration);
}
export declare class WritingsApi {
    private config;
    constructor(config: Configuration);
}
//# sourceMappingURL=api.d.ts.map