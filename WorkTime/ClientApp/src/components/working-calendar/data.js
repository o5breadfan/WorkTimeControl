import { guid } from "@progress/kendo-react-common";
const baseData = [{
    "Title": "Польская Полина",
    "Start": "2022-04-24T08:00:00.000Z",
    "End": "2022-04-24T08:30:00.000Z",
    "isAllDay": false,
    "RequestType": 0,
    "RequestId": "0"
}];
export const customModelFields = {
    id: 'RequestId',
    description: 'Description',
    start: 'Start',
    end: 'End',
    title: 'Title'
};
const currentYear = new Date().getFullYear();

const parseAdjust = eventDate => {
    const date = new Date(eventDate);
    date.setFullYear(currentYear);
    return date;
};

export const displayDate = new Date(Date.UTC(currentYear, 5, 24));
export const sampleDataWithCustomSchema = baseData.map(dataItem => ({ ...dataItem,
    RequestId: guid(),
    Start: parseAdjust(dataItem.Start),
    End: parseAdjust(dataItem.End)
}));