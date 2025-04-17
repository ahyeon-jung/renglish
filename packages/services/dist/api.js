export class Configuration {
    constructor(basePath, fetchApi) {
        this.basePath = basePath;
        this.fetchApi = fetchApi;
    }
}
// API 클래스들
export class AuthApi {
    constructor(config) {
        this.config = config;
    }
    async authControllerCheckValidAccessToken() {
        const response = await this.config.fetchApi?.(`${this.config.basePath}/auth/check-token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response)
            throw new Error('Fetch API is not configured');
        return response.json();
    }
}
export class DialoguesApi {
    constructor(config) {
        this.config = config;
    }
}
export class EmailVerificationApi {
    constructor(config) {
        this.config = config;
    }
}
export class ExpressionApi {
    constructor(config) {
        this.config = config;
    }
}
export class MoviesApi {
    constructor(config) {
        this.config = config;
    }
}
export class MyApi {
    constructor(config) {
        this.config = config;
    }
}
export class ScenesApi {
    constructor(config) {
        this.config = config;
    }
}
export class SpeakersApi {
    constructor(config) {
        this.config = config;
    }
}
export class StudyApi {
    constructor(config) {
        this.config = config;
    }
}
export class UsersApi {
    constructor(config) {
        this.config = config;
    }
}
export class WritingsApi {
    constructor(config) {
        this.config = config;
    }
}
//# sourceMappingURL=api.js.map