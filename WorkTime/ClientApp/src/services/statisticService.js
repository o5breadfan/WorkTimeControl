import { ApiEndPoints } from "./constants";

class statisticService {
    getStatistic(){
        return fetch(ApiEndPoints.STATISTIC_GET.path, {
            method: ApiEndPoints.STATISTIC_GET.method,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export default new statisticService();