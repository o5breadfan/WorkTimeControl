import * as React from 'react';
import { FormElement, Field } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import {Checkbox, TextArea} from '@progress/kendo-react-inputs';
import { DatePicker, DateTimePicker } from '@progress/kendo-react-dateinputs';
import { RequestTypeEditor } from './editors';
export const CustomFormEditor = props => {
    return <FormElement>
        <div className="k-form-field">
            <Label>
                Тип заявки
            </Label>
            <div className="k-form-field-wrap">
                <Field name={'RequestType'} component={RequestTypeEditor} />
                {props.errors.RequestType && <Error>{props.errors.RequestType}</Error>}
            </div>
        </div>
        <div className="row">
            <div className="col-6">
                <Label>
                    Дата нчала заявки
                </Label>
                <Field name={'Start'} component={props.startEditor || DatePicker} as={DateTimePicker} format="t" />
            </div>
            <div className="col-6">
                <Label>
                    Дата конца заявки
                </Label>
                <Field name={'End'} component={props.endEditor || DatePicker} as={DateTimePicker} format="t" />
            </div>
        </div>
        <div className="k-form-field">
            <Checkbox label={"Весь день"} name={'isAllDay'} />
        </div>
        <div className="k-form-field">
            <Label>
                Комментарий
            </Label>
            <div className="k-form-field-wrap">
                <Field name={'Note'} component={TextArea} />
            </div>
        </div>
        
    </FormElement>;
};