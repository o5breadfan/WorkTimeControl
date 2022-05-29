import * as React from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { RequestType } from '../../utils/constants';

export const RequestTypeEditor = props => {
    const handleChange = event => {
        if (props.onChange) {
            props.onChange.call(undefined, {
                value: event.value.id
            });
        }
    };

    const requestType = Object.keys(RequestType).map(key => RequestType[key]);
    
    return <DropDownList onChange={handleChange} value={requestType.find(p => p.id === props.value)} data={requestType} dataItemKey={'id'} textField={'name'} />;
};