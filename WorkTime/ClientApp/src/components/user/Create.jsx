import userServices from "../../services/userService";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { RoleType } from "../../utils/constants";
import { Button } from "@progress/kendo-react-buttons";
import { Field, Form, FormElement } from '@progress/kendo-react-form';
import { useEffect } from "react";
import departmentService from "../../services/departmentService";
import { useState } from "react";
import {getter} from "@progress/kendo-data-query";
import ValidationInput from "../utils/ValidationInput";
import {Alert} from "react-bootstrap";
import ValidationDatePicker from "../utils/ValidationDatePicker";
import {Label} from "@progress/kendo-react-labels";

const surnameGetter = getter("surname");
const nameGetter = getter("name");
const roleGetter = getter("role");
const startDateGetter = getter("startDate");
const loginGetter = getter("login");

export default function CreateUser() {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        department: null,
        role: null
    });
    const [departments, setDepartments] = useState();

    useEffect(() => {
        departmentService.getDependents()
            .then(result => setDepartments(result))
    }, [])

    const handleSubmit = (event) => {
        if (event) {
            event['roleId'] = state.role ? state.role.id : null;
            event['departmentId'] = state.department ? state.department.id : null;

            userServices.create(event)
                .then(newUser => {
                    if (newUser) {
                        alert("Пользователь успешно создан");
                        navigate('/user/list');
                    }
                })
        } else {
            alert(JSON.stringify(event, null, 2));
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
    
    const rolesNotDepartment = [RoleType.Admin, RoleType.Director, RoleType.TechnicalDirector];

    const formValidator = (values) => {
        if (surnameGetter(values) || nameGetter(values) || roleGetter(values) || startDateGetter(values) || loginGetter(values)) {
            return;
        }

        return {
            VALIDATION_SUMMARY: "Пожалуйста, заполните все обязательные поля.",
            ["surname"]:
                "Поле обязательно для заполнения.",
            ["name"]:
                "Поле обязательно для заполнения.",
            ["role"]:
                "Поле обязательно для заполнения.",
            ["startDate"]:
                "Поле обязательно для заполнения.",
            ["login"]:
                "Поле обязательно для заполнения."
        };
    };

    return <Form onSubmit={handleSubmit}
                 validator={formValidator}
        render={(formRenderProps) => (
            <div className="k-form">
                <FormElement>
                    {formRenderProps.visited &&
                        formRenderProps.errors &&
                        formRenderProps.errors.VALIDATION_SUMMARY && (
                            <Alert variant="danger">
                                {formRenderProps.errors.VALIDATION_SUMMARY}
                            </Alert>
                    )}
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-6">
                            <Label>Фамилия:</Label>
                            <Field name="surname" component={ValidationInput} />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-6">
                            <Label>Имя:</Label>
                            <Field name="name" component={ValidationInput} />
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-6">
                            <Label>Должность:</Label>
                            <Field name="role" component={roleComponent}/>
                        </div>
                    </div>

                    { !rolesNotDepartment.includes(state.role) &&
                        <div className="row mb-3 justify-content-center">
                            <div className="col-md-6">
                                <Label>Отдел:</Label>
                                <Field component={departmentComponent} name="department"/>
                            </div>
                        </div>
                    }

                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-6">
                            <Label> Дата трудоустройства:</Label>
                            <Field name="startDate" component={ValidationDatePicker}/>
                        </div>
                    </div>

                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-6">
                            <Label>E-mail:</Label>
                            <Field name="login" component={ValidationInput}/>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-6 text-md-right">
                            <Button type="submit" 
                                    themeColor="primary"
                                    className="mr-2"
                                    disabled={!formRenderProps.allowSubmit}
                            >
                                Создать
                            </Button>
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