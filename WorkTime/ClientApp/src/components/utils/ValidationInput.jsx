import {Input} from "@progress/kendo-react-inputs";
import {Error} from "@progress/kendo-react-labels";
import React from "react";

export default function ValidationInput(fieldRenderProps) {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div>
            <Input {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    );
};