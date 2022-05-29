export const API_URL = 'http://localhost:51059';

export const ApiEndPoints = {
    USER_LOGIN: { path: `authorization/login`, method: 'POST' },
    AUTHENTICATE_USER: { path: `authorization/authenticate`, method: "GET" },
    LOGOUT_USER: {path: `authorization/logout`, method: "POST" },

    USER_CREATE: { path: `user/addUser`, method: 'POST' },
    USER_GET_ALL: { path: `user/getAll`, method: 'GET' },
    USER_GET_ALL_NAME: { path: `user/getAllName`, method: 'GET' },
    USER_GET: { path: `user/getUser/:id`, method: 'GET' },
    USER_UPDATE_INFO: { path: `user/update/:id`, method: "POST" },
    USER_DELETE: { path: `user/delete/:id`, method: "POST" },
    USER_CHANGE_PASSWORD: { path: `user/changePassword`, method: "POST" },
    USER_DISMISSED: {path: `user/dismissed`, method: "POST"},
    
    REQUEST_CREATE: { path: `request/addRequest`, method: 'POST' },
    REQUEST_GET_REQUESTS: { path: `request/getRequests`, method: 'GET' },
    REQUEST_GET_REQUEST: { path: `request/getRequest/:id`, method: 'GET' },
    REQUEST_EDIT: { path: `request/update/:id`, method: 'POST' },

    STATISTIC_GET: { path: `statistic/getStatistic`, method: "GET" },
    
    DEPARTMENTS_CREATE: { path: `department/add`, method: 'POST'},
    DEPARTMENTS_GET_DEPARTMENTS: { path: `department/getDepartments`, method: 'GET' },
    DEPARTMENTS_GET_ALL_DETAIL: {path: `department/getDepartmentsDetail`, method: 'GET'},
    DEPARTMENTS_DElETE: {path: `department/delete`, method: 'POST'}
}