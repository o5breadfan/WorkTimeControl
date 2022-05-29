import * as React from 'react';
import { guid } from '@progress/kendo-react-common';
import { MonthView, Scheduler } from '@progress/kendo-react-scheduler';
import { FormWithCustomEditor } from "./custom-form";
import { TimeZone } from "../../globalization/loading-messages"
import {
    customModelFields,
    displayDate,
    sampleDataWithCustomSchema,
} from "./data";

export default function WorkingCalendar() {
    const [date, setDate] = React.useState(displayDate);
    const [data, setData] = React.useState(sampleDataWithCustomSchema);
    
    const handleDateChange = React.useCallback(event => {
        setDate(event.value);
    }, [setDate]);

    const handleDataChange = ({ created, updated, deleted }) => {
        setData((old) =>
            old
                .filter(
                    (item) =>
                        deleted.find(
                            (current) => current.RequestId === item.RequestId
                        ) === undefined
                )
                .map(
                    (item) =>
                        updated.find(
                            (current) => current.RequestId === item.RequestId
                        ) || item
                )
                .concat(
                    created.map((item) =>
                        Object.assign({}, item, {
                            RequestId: guid(),
                        })
                    )
                )
        );
    };
    
    return <div>
        <Scheduler data={data} onDataChange={handleDataChange} date={date} 
                   onDateChange={handleDateChange} editable={true} timezone={TimeZone} modelFields={customModelFields}
                   form={FormWithCustomEditor}>
            <MonthView/>
        </Scheduler>
    </div>;
};