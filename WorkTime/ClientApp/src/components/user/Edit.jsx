import userServices from "../../services/userService";
import { Link, useNavigate, useParams } from "react-router-dom";
import React from "react";
import {Input} from "@progress/kendo-react-inputs";
import {DatePicker} from "@progress/kendo-react-dateinputs";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {RoleType} from "../../utils/constants";
import {Button} from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { useEffect } from "react";
import departmentService from "../../services/departmentService";
import { useState } from "react";
import moment from "moment";
import {Label} from "@progress/kendo-react-labels";



export default function Edit() {
    const navigate = useNavigate();

    const { id } = useParams();
    const [state, setState] = React.useState({
        department: null,
        role: null
    });
    const [departments, setDepartments] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        departmentService.getDependents()
            .then(result => setDepartments(result))
    }, [])

    useEffect(() => {
        userServices.getUserById(id)
            .then(result => {
                setUser({
                    ...result,
                    birthdate: result.birthdate ? new Date(moment(result.birthdate)) : null,
                    startDate: result.startDate ? new Date(moment(result.startDate)) : null
                });
                setState({ department: result.department, role: result.role });
            })
    }, [id])

    const handleSubmit = (event) => {
        if (event) {
            event['roleId'] = state.role ? state.role.id : null;
            event['departmentId'] = state.department ? state.department.id : null;

            userServices.update(event)
                .then(result => {
                        if (result) {
                            alert("Пользователь успешно отредактирован");
                            navigate("/user/list");
                        }
                    }
                )
        }
    }

    const roleComponent = () => {
        return <DropDownList
            id="roles"
            name="role"
            defaultItem={{ name: "выберите должность..." }}
            data={Object.keys(RoleType).map(key => RoleType[key])}
            textField="name"
            dataItemKey="id"
            value={state.role}
            onChange={handleChange}
        />
    }

    const departmentComponent = () => {
        return <DropDownList
            id="departmentId"
            name="department"
            data={departments}
            textField="name"
            dataItemKey="id"
            defaultItem={{ name: "выберите отдел..." }}
            value={state.department}
            onChange={handleChange}
        />
    }

    const handleChange = (event) => {
        let name = event.target.name || event.target.element.current.name;
        setState({ ...state, [name]: event.target.value });
    };

    return <Form onSubmit={handleSubmit}
                 initialValues={user}
                 key={JSON.stringify(user)}
                 render={() => (
                     <div className="k-form">
                         <FormElement>
                             <div className="row mb-3 justify-content-center">
                                 <div className="col-md-6">
                                     <Label>Фамилия:</Label>
                                     <Field name="surname" value={user ? user.surname : null} component={Input} />
                                 </div>
                             </div>

                             <div className="row mb-3 justify-content-center">
                                 <div className="col-md-6">
                                     <Label>Имя:</Label>
                                     <Field name="name" value={user ? user.name : 0} component={Input}/>
                                 </div>
                             </div>

                             <div className="row mb-3 justify-content-center">
                                 <div className="col-md-6">
                                     <Label>Должность:</Label>
                                     <Field name="role" component={roleComponent} />
                                 </div>
                             </div>

                             <div className="row mb-3 justify-content-center">
                                 <div className="col-md-6">
                                     <Label>Отдел:</Label>
                                    <Field name="department" component={departmentComponent} />
                                 </div>
                             </div>

                             <div className="row mb-3 justify-content-center">
                                 <div className="col-md-6">
                                     <Label> Дата трудоустройства:</Label>
                                     <Field name="startDate" component={DatePicker} />
                                 </div>
                             </div>

                             <div className="row mb-3 justify-content-center">
                                 <div className="col-md-6">
                                     <Label>E-mail:</Label>
                                     <Field name="login" value={user ? user.login : ""} component={Input} />
                                 </div>
                             </div>

                             <div className="row justify-content-center">
                                 <div className="col-md-6 text-md-right">
                                     <Button type="submit" themeColor="primary" className="mr-2">Сохранить</Button>
                                     <Button>
                                         <Link to="/user/list">Отменить</Link>
                                     </Button>
                                 </div>
                             </div>
                         </FormElement>
                     </div>
                 )}>
    </Form>
}