import { ApiEndPoints } from "./constants";
import BaseService from "./baseService";

class userService extends BaseService{
    constructor(){
        super();
    }

    login(credentials) {
        return this.httpContext(ApiEndPoints.USER_LOGIN.path, {
            method: ApiEndPoints.USER_LOGIN.method,
            body: JSON.stringify(credentials)
        })
    }

    create(user) {
        return this.httpContext(ApiEndPoints.USER_CREATE.path, {
            method: ApiEndPoints.USER_CREATE.method,
            body: JSON.stringify(user)
        })
    }

    getAllUsers() {
        return this.httpContext(ApiEndPoints.USER_GET_ALL.path, {
            method: ApiEndPoints.USER_GET_ALL.method
        })
    }

    getAllUserNames() {
        return this.httpContext(ApiEndPoints.USER_GET_ALL_NAME.path, {
            method: ApiEndPoints.USER_GET_ALL_NAME.method
        })
    }

    getUserById = (id) => {
        return this.httpContext(ApiEndPoints.USER_GET.path.replace(':id', id), {
            method: ApiEndPoints.USER_GET.method
        })
    }

    update = (user) => {
        return this.httpContext(ApiEndPoints.USER_UPDATE_INFO.path.replace(':id', user.id), {
            method: ApiEndPoints.USER_UPDATE_INFO.method,
            body: JSON.stringify(user)
        })
    }

    delete = (id) => {
        return this.httpContext(ApiEndPoints.USER_DELETE.path.replace(':id', id), {
            method: ApiEndPoints.USER_DELETE.method
        })
    }
    
    changePassword(newPassword) {
        return this.httpContext(ApiEndPoints.USER_CHANGE_PASSWORD.path, {
            method: ApiEndPoints.USER_CHANGE_PASSWORD.method,
            body: JSON.stringify(newPassword)
        })
    }

    dismissedUser = (userLogin) => {
        return this.httpContext(ApiEndPoints.USER_DISMISSED.path, {
            method: ApiEndPoints.USER_DISMISSED.method,
            body: JSON.stringify(userLogin)
        })
    }
}
const userServices = new userService();

export default userServices;