import { ApiEndPoints } from "./constants"
import BaseService from "./baseService.js";

class AuthUser extends BaseService {
    constructor(){
        super();
    }
    authenticateUser = () => {
        return this.httpContext(ApiEndPoints.AUTHENTICATE_USER.path, {
            method: ApiEndPoints.AUTHENTICATE_USER.method
        })
    }

    logout = () => {
        return this.httpContext(ApiEndPoints.LOGOUT_USER.path, {
            method: ApiEndPoints.LOGOUT_USER.method
        })
    }
}


export default new AuthUser;