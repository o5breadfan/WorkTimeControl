import { Link, useNavigate } from "react-router-dom";
import React from "react";
import {Checkbox, TextArea} from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import {RequestType} from "../../utils/constants";
import requestService from "../../services/requestService";

export default function CreateRequest() {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        requestType: null
    });
    
    const handleSubmit = (event) => {
        if (event) {
            event['requestTypeId'] = state.requestType ? state.requestType.id : null;

            requestService.create(event)
                .then(result => {
                    if (result) {
                        alert("Заявка успешно создана");
                        navigate('/request/list');
                    }
                })
                .catch(error => alert(error))
        }
    }

    const requestTypeComponent = () => {
        return <DropDownList
            id="requestTypeId"
            name="requestType"
            defaultItem={{ name: "выберите тип заявки..." }}
            data={Object.keys(RequestType).map(key => RequestType[key])}
            textField="name"
            dataItemKey="id"
            value={state.requestType}
            onChange={handleChange}
            className="col-md-6"
        />
    }

    const handleChange = (event) => {
        let name = event.target.name || event.target.element.current.name;
        setState({ ...state, [name]: event.target.value });
    };

    const dayOffType = [RequestType.TimeOffOfRecycling, RequestType.TimeOffOfVacation, RequestType.TimeOffOfWorkingOut, RequestType.TimeOffOf];
    
    return <Form onSubmit={handleSubmit}
        render={() => (
            <div className="k-form">
                <FormElement>
                    <div className="row mb-3">
                        <div className="col-md-3 text-md-right">
                            <label className="col-form-label">Тип заявки:</label>
                        </div>
                        <Field
                            id="requestType"
                            component={requestTypeComponent}
                        />
                    </div>

                    {dayOffType.includes(state.requestType) &&
                        <div className="row mb-3">
                            <div className="col-md-3 text-md-right">
                            <label className="col-form-label"> Дата выходного:</label>
                            </div>
                            <Field className="col-md-6"
                            name="startDate"
                            component={DatePicker}
                            />
                        </div>
                    }

                    {state.requestType === RequestType.TimeOffOfWorkingOut &&
                        <div className="row mb-3">
                            <div className="col-md-3 text-md-right">
                                <label className="col-form-label"> Дата отработки:</label>
                            </div>
                            <Field className="col-md-6"
                                   name="workingOutDate"
                                   component={DatePicker}
                            />
                        </div>
                    }

                    {!dayOffType.includes(state.requestType) && 
                        <div>
                            <div className="row mb-3">
                                <div className="col-md-3 text-md-right">
                                    <label className="col-form-label"> Дата начала:</label>
                                </div>
                                <Field className="col-md-6"
                                       name="startDate"
                                       component={DatePicker}
                                />
                            </div>
                            
                            <div className="row mb-3">
                                <div className="col-md-3 text-md-right">
                                <label className="col-form-label"> Дата окончания:</label>
                                </div>
                                <Field className="col-md-6"
                                name="endDate"
                                component={DatePicker}
                                />
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-3 text-md-right">
                                    <label className="col-form-label"> Возможность передвинуть даты:</label>
                                </div>
                                <Field className="col-md-6"
                                       name="rescheduleVacation"
                                       component={Checkbox}
                                />
                            </div>
                        </div>
                    }
                    
                    <div className="row mb-3">
                        <div className="col-md-3 text-md-right">
                            <label className="col-form-label">Комментарий:</label>
                        </div>
                        <Field className="col-md-6"
                            name="description"
                            component={TextArea}
                        />
                    </div>

                    <div className="row">
                        <div className="offset-md-3 col-md-6">
                            <Button type="submit" themeColor="primary" className="mr-2">Создать</Button>

                            <Link to="/request/list">
                                <Button>Отменить</Button>
                            </Link>
                        </div>
                    </div>
                </FormElement>
            </div>
        )}>
    </Form>
}