export default class BaseService {
    constructor(){

    }

    httpContext = (url, options) =>{
        var jwtToken = document.cookie.split('=')[1];
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '.concat(jwtToken)
            },
            ...options
        }).then(response => {
            const data = response.json() || null;
            if(!response.ok){
                const error = (data && data.message) || response.status;
                return Promise.reject(error)
            }
            else{
                return data;
            }
        })
    }
};
