import * as React from 'react';
import {Input} from "@progress/kendo-react-inputs";
import {Grid, GridColumn} from "@progress/kendo-react-grid";
import {useEffect, useState} from "react";
import statisticService from "../../services/statisticService";

export default function Statistics() {
    
    const [statistic, setStatistic] = useState(); 
    
    useEffect(() => {
        statisticService.getStatistic()
            .then(result => setStatistic(result))
    }, [])
    
     return <div>
         <div className="row mb-3">
             <div className="col-md-5 text-md-right">
                 <label className="col-form-label">Отработано в текущем году (дни):</label>
             </div>
             <Input className="col-md-6 col-12"
                    name="daysWorkedCurrentYear"
                    value={statistic? statistic.daysWorkedCurrentYear : null}
                    readOnly
             />
         </div>

         <div className="row mb-3">
             <div className="col-md-5 text-md-right">
                 <label className="col-form-label">Не использованный отпуск в текущем году (дни):</label>
             </div>
             <Input className="col-md-6 col-12"
                    name="notUsedCurrentYear"
                    value={statistic ? statistic.notUsedCurrentYear : null}
                    readOnly
             />
         </div>

         <div className="row mb-3">
             <div className="col-md-5 text-md-right">
                 <label className="col-form-label">Не использованный отпуск за прошедшие года (дни):</label>
             </div>
             <Input className="col-md-6 col-12"
                    name="notUsedLastYear"
                    value={statistic ? statistic.notUsedLastYear : null}
                    readOnly
             />
         </div>

         <div className="row mb-3">
             <div className="col-md-5 text-md-right">
                 <label className="col-form-label">Отгулы в текущем году (дни):</label>
             </div>
             <Input className="col-md-6 col-12"
                    name="dayOffCurrentYear"
                    value={statistic ? statistic.dayOffCurrentYear : null}
                    readOnly
             />
         </div>
         
         <Grid data={statistic ? statistic.requestStatistics : null}>
             <GridColumn field="type" title="Тип заявки" />
             <GridColumn field="numbersOfDays" title="Количество дней"/>
         </Grid>
     </div>
}