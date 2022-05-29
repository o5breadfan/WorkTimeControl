import BaseService from "./baseService";
import { ApiEndPoints } from "./constants";

class departmentService extends BaseService {
    
    getDependents() {
        return this.httpContext(ApiEndPoints.DEPARTMENTS_GET_DEPARTMENTS.path, {
            method: ApiEndPoints.DEPARTMENTS_GET_DEPARTMENTS.method
        })
    }

    create(department) {
        return this.httpContext(ApiEndPoints.DEPARTMENTS_CREATE.path, {
            method: ApiEndPoints.DEPARTMENTS_CREATE.method,
            body: JSON.stringify(department)
        })
    }
    
    getDepartmentsDetail() {
        return this.httpContext(ApiEndPoints.DEPARTMENTS_GET_ALL_DETAIL.path, {
            method: ApiEndPoints.DEPARTMENTS_GET_ALL_DETAIL.method
        })
    }
    
    delete(id) {
        return this.httpContext(ApiEndPoints.DEPARTMENTS_DElETE.path, {
            method: ApiEndPoints.DEPARTMENTS_DElETE.method,
            body: JSON.stringify(id)
        })
    }
}

export default new departmentService();