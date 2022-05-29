import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import  logo  from "../../images/logo2.png";
import { Button } from '@progress/kendo-react-buttons';
import { Field, Form, FormElement  } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import {
    Notification,
} from "@progress/kendo-react-notification";
import { Fade } from "@progress/kendo-react-animation";

import "./Login.scss";
import userServices from "../../services/userService"
import { useAuth } from "../hooks/useAuth";

export default function Login(props) {

    const location = useLocation();
    const navigate = useNavigate();
    const {signin} = useAuth();

    const fromPage = location.state?.from?.pathname || '/request/list';

    const [isError, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const requiredValidator = (value) => {
        return value ? "" : "This field is required.";
    }

    const _handleSubmit = (event) => {
        userServices.login(event)
            .then(result => {
                signin(result.user, () => navigate(fromPage, {replace: true}))
            })
    }

    return (
        <React.Fragment>
            <Form
                onSubmit={_handleSubmit}
                render={() => (
                    <div className={"form form-auth"}>
                        <FormElement>
                            <img src={logo} className="my-3" alt={"logo"} style={{width: 300}} />
                            <div className="row mb-3">
                                <div className={"col-md-12"}>
                                    <Field
                                        className="col-md-12"
                                        label="Имя пользователя"
                                        name="login"
                                        component={Input}
                                        validator={requiredValidator}
                                    />
                                </div>
                            </div>

                            <div className={"row mb-3"}>
                                <div className={"col-md-12"}>
                                    <Field
                                        className="col-md-12"
                                        label="Пароль"
                                        name="password"
                                        type="password"
                                        component={Input}
                                        validator={requiredValidator}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 k-form-buttons d-flex justify-content-center mb-3">
                                    <Button
                                        className="submit-button px-4"
                                        themeColor={"primary"}
                                        type="submit"> Войти
                                    </Button>
                                </div>
                            </div>

                        </FormElement>
                    </div>
                )}>
            </Form>
            {isError && (
                <Fade>
                    <Notification
                        type={{
                            style: "error",
                            icon: true,
                        }}
                        closable={true}
                        onClose={() => setError(false)}
                    >
                        <span>{errorMessage}</span>
                    </Notification>
                </Fade>
            )}
        </React.Fragment>
    );
}