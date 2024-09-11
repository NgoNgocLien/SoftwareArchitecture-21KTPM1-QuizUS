class AuthenticationService {
    constructor() {
        if (!AuthenticationService.instance) {
            AuthenticationService.instance = this;
        }
        return AuthenticationService.instance;
    }

    async login(username, password) {
        const user_login = { username, password };
        const response = await login(user_login)

        if (response.success) {
            return { success: true, user: response.data };
        } else {
            return { success: false, message: response.message || "Login failed" };
        }
    }
}

const authService = new AuthenticationService();
Object.freeze(authService);
export default authService;