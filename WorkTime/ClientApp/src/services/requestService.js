import BaseService from "./baseService";
import {ApiEndPoints} from "./constants";

class requestService extends BaseService {
    getRequests(){
        return this.httpContext(ApiEndPoints.REQUEST_GET_REQUESTS.path, {
            method: ApiEndPoints.REQUEST_GET_REQUESTS.method
        })
    }

    getRequest = (id) => {
        return this.httpContext(ApiEndPoints.REQUEST_GET_REQUEST.path.replace(':id', id), {
            method: ApiEndPoints.REQUEST_GET_REQUEST.method
        })
    }

    edit = (request) => {
        return this.httpContext(ApiEndPoints.REQUEST_EDIT.path.replace(':id', request.id), {
            method: ApiEndPoints.REQUEST_EDIT.method,
            body: JSON.stringify(request)
        })
    }
    
    create(request) {
        return this.httpContext(ApiEndPoints.REQUEST_CREATE.path, {
            method: ApiEndPoints.REQUEST_CREATE.method,
            body: JSON.stringify(request)
        })
    }
}

export default new requestService();