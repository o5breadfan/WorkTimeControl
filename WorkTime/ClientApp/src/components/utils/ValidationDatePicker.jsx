import {Error} from "@progress/kendo-react-labels";
import React from "react";
import {DatePicker} from "@progress/kendo-react-dateinputs";

export default function ValidationDatePicker(fieldRenderProps) {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <DatePicker {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    );
};