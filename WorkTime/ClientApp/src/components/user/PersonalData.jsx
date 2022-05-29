import * as React from "react";
import {Input} from "@progress/kendo-react-inputs";
import {DatePicker} from "@progress/kendo-react-dateinputs";
import {useEffect, useState} from "react";
import {useAuth} from "../hooks/useAuth"
import departmentService from "../../services/departmentService";
import userServices from "../../services/userService";
import moment from "moment";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {RoleType} from "../../utils/constants";
import Button from "@progress/kendo-react-buttons/dist/es/Button";

export default function PersonalData(){
    
    const [state, setState] = React.useState({
        newPassword: null,
        newPasswordRepeat: null
    });
    const {currentUser} = useAuth();

    const handleChange = (event) => {
        let name = event.target.name || event.target.element.current.name;
        setState({ ...state, [name]: event.target.value });
    };
    
    const [departments, setDepartments] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
        departmentService.getDependents()
            .then(result => setDepartments(result))
    }, [])

    useEffect(() => {
        userServices.getUserById(currentUser.id)
            .then(result => {
                setUser({
                    ...result,
                    birthdate: result.birthdate ? new Date(moment(result.birthdate)) : null,
                    startDate: result.startDate ? new Date(moment(result.startDate)) : null
                });
            })
    }, [])
    
    const [visible, setVisible] = useState(false);
    
    const showEditor = (event) => {
        setVisible(true);
    }
    
    const changePassword = (event) => {
        if(state.newPassword === state.newPasswordRepeat) {
            userServices.changePassword(state.newPassword)
                .then(result => {
                    if (result){
                        alert("Пароль успешно изменен");
                        setVisible(false);
                    }
                })
                .catch(error => alert(error))
        }
    }
    
    return <div>
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label">Фамилия:</label>
             </div>
             <div className="col-md-6 col-12">
                 <Input name="surname" value={user ? user.surname : ""} disabled={true}/>
             </div>
         </div>
    
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label">Имя:</label>
             </div>
             <div className="col-md-6 col-12">
                 <Input name="name" value={user ? user.name : ""} disabled={true}/>
             </div>
         </div>
    
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label">Дата рождения:</label>
             </div>
             <div className="col-md-6 col-12">
                 <DatePicker name="birthdate" disabled={true} value={user ? user.birthdate : null}/>
             </div>
         </div>
    
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label">Должность:</label>
             </div>
             <div className="col-md-6 col-12">
                 <DropDownList
                     id="roles"
                     name="role"
                     data={Object.keys(RoleType).map(key => RoleType[key])}
                     textField="name"
                     dataItemKey="id"
                     value={user ? user.role : null}
                     disabled={true} />
             </div>
         </div>
    
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label">Отдел:</label>
             </div>
             <div className="col-md-6 col-12">
                 <DropDownList
                     id="departmentId"
                     name="department"
                     data={departments}
                     textField="name"
                     dataItemKey="id"
                     value={user ? user.department : null}
                     disabled={true}
                 />
             </div>
         </div>
    
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label"> Дата трудоустройства:</label>
             </div>
             <div className="col-md-6 col-12">
                 <DatePicker name="startDate" value={user ? user.startDate : null} disabled={true}/>
             </div>
             
         </div>
    
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label">E-mail:</label>
             </div>
             <div className="col-md-6 col-12">
                 <Input name="login" value={user ? user.login : ""} disabled={true}/>
             </div>
         </div>
    
         <div className="row mb-3">
             <div className="col-md-3 text-md-right">
                 <label className="col-form-label">Пароль:</label>
             </div>
             <div className="col-md-6 col-12">
                 {!visible &&
                    <Button onClick={showEditor}>Изменить</Button>
                 }
                 {visible &&
                    <Input name="newPassword" type="password" onChange={handleChange}/>
                 }
             </div>
         </div>
        {visible && <div>
            <div className="row mb-3">
                <div className="col-md-3 text-md-right">
                    <label className="col-form-label">Повторите пароль:</label>
                </div>
                <div className="col-md-6 col-12">
                    <Input name="newPasswordRepeat" type="password" onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <Button onClick={changePassword}>Сохранить</Button>
                </div>
            </div>
        </div>
        }
    </div>
}