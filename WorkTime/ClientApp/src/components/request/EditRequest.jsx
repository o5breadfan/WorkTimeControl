import * as React from "react";
import {Field, Form, FormElement} from "@progress/kendo-react-form";
import {DatePicker} from "@progress/kendo-react-dateinputs";
import {RequestType} from "../../utils/constants";
import {Checkbox, TextArea} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";
import {Link, useNavigate, useParams} from "react-router-dom";
import requestService from "../../services/requestService";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import moment from "moment";
import {useEffect, useState} from "react";

export default function EditRequest() {
    const navigate = useNavigate();

    const { id } = useParams();
    
    const [state, setState] = useState({
        requestType: null
    });

    const [request, setRequest] = useState();
    
    useEffect(() => {
        requestService.getRequest(id)
            .then(result => {
                setRequest({
                    ...result,
                    createDate: result.createDate ? new Date(moment(result.createDate)) : null,
                    sendDate: result.sendDate ? new Date(moment(result.sendDate)) : null,
                    startDate: result.startDate ? new Date(moment(result.startDate)) : null,
                    endDate: result.endDate ? new Date(moment(result.endDate)) : null
                });
                setState({ requestType: result.requestType });
            })
    }, [id])

    const dayOffType = [RequestType.TimeOffOfRecycling.id, RequestType.TimeOffOfVacation.id, RequestType.TimeOffOfWorkingOut.id, RequestType.TimeOffOf.id];
    
    const handleSubmit = (event) => {
        if (event) {
            event['requestTypeId'] = state.requestType ? state.requestType.id : null;

            requestService.edit(event)
                .then(result => {
                    if (result) {
                        alert("Заявка успешно отредактирована");
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
            disabled
            className="col-md-6"
        />
    }
    
    return <Form onSubmit={handleSubmit}
                 initialValues={request}
                 key={JSON.stringify(request)}
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

                             {dayOffType.includes(state.requestType?.id) &&
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

                             {state.requestType?.id === RequestType.TimeOffOfWorkingOut.id &&
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

                             {!dayOffType.includes(state.requestType?.id) &&
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
                                                value={request ? request.rescheduleVacation : null}
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
                                        name="login"
                                        value={request ? request.description : null}
                                        component={TextArea}
                                 />
                             </div>

                             <div className="row">
                                 <div className="offset-md-3 col-md-6">
                                     <Button type="submit" themeColor="primary" className="mr-2">Сохранить</Button>

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