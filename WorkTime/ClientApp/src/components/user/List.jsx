import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy } from "@progress/kendo-data-query";
import { DropdownFilterCell } from "./dropdownFilterCell";
import { Button, DropDownButton } from "@progress/kendo-react-buttons";
import { Link, useNavigate } from "react-router-dom";
import userServices from '../../services/userService';
import React, {useState, useEffect} from "react";
import moment from "moment";
import { useAuth } from "../hooks/useAuth";
import { showError } from "../../utils/notifyHelper";
import {Checkbox} from "@progress/kendo-react-inputs";
import {Dialog, DialogActionsBar} from "@progress/kendo-react-dialogs";
import {RoleType} from "../../utils/constants";

const ListUsers = () => {
    const initialFilter = {
        filters: [
            {
                field: "dismissed",
                operator: "eq",
                value: "Работающий",
            },
        ],
        logic: "and",
    };
    
    const initialSort = [
        {
            field: "fullName",
            dir: "asc"
        }   
    ]
    
    const [users, setUsers] = useState();
    const [filter, setFilter] = useState();
    const [sort, setSort] = useState(initialSort);
    const {currentUser} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        userServices.getAllUsers()
            .then(data => {
                data.map(x => {
                    x.startDate = x.startDate ? moment(x.startDate).format("DD.MM.YYYY") : null;
                    x.dismissed = x.dismissed ? "Уволен" : "Работающий";
                    x.fullName = x.surname + " " + x.name;
                })
                setUsers(data);
                setFilter(initialFilter);
            })
            .catch(error => {
                showError(error);
            })
    }, []);

    const dropDownButtonItems = () => {
        switch (currentUser?.roleId) {
            case RoleType.Admin:
                return ["Редактировать", "Уволить"]
            default:
                return ["Редактировать", "Уволить"]
        }
    }

    const roles = Array.from(
        new Set(users
            ? users.map((u) => (u.role ? u.role.name : ""))
            : null
        )
    );

    const RoleFilterCell = (props) => (
        <DropdownFilterCell
            {...props}
            data={roles}
            defaultItem={"Выберите должность"}
        />
    );

    const departments = Array.from(
        new Set(users
            ? users.map((u) => (u.department ? u.department.name : " "))
            : null
        )
    ).filter(arr => arr !== " ");

    const DepartmentFilterCell = (props) => (
        <DropdownFilterCell
            {...props}
            data={departments}
            defaultItem={"Выберите отдел"}
        />
    );

    const dismissed = Array.from(
        new Set(users
            ? users.map((u) => (u.dismissed))
            : null
        )
    );
    
    const DismissedFilterCell = (props) => (
        <DropdownFilterCell
            {...props}
            data={dismissed}
            defaultItem={"(Все)"}
        />
    );

    const deleteUser = (user) => {
       
    }

    const dismissedUser = (dismissedUser) => {
        if(dismissedUser){
            userServices.dismissedUser(dismissedUser.login)
                .then(result => {
                     setUsers(users.map(
                        user => {
                            if(user.login !== result.login) return user;

                            return {
                                ...user,
                                dismissed: "Уволен"
                            }
                        }
                    ));
                    alert("Пользователь успешно уволен");
                })
        }
    }

    const onItemClick = (button) => {
        switch (button.item) {
            case "Редактировать":
                navigate(`/list/${button.target.props.user.id}/edit`);
                break;
            case "Уволить":
                setVisible(!visible);
                break;
            default:
                break;
        }
    };

    const onDeleteUser = (user) => {
        deleteUser(user);
    }

    const Action = (props) => {
        return <td className="text-center">
            <DropDownButton key={props.dataItem.id} items={dropDownButtonItems()}
                text="Действия"
                user={props.dataItem}
                onItemClick={onItemClick} />
        </td>
    };
    
    const [includeDismissed, setIncludeDismissed] = useState(false);
    
    const filterWithDismissed = {
        logic: "and",
        filters: [
            {
                field: "dismissed",
                operator: "eq",
                value: "Уволен"
            },
            {
                field: "dismissed",
                operator: "eq",
                value: "Работающий"
            },
        ],
    };
    
    const handleChange = (event) => {
        setIncludeDismissed(event.value);
        event.value === true ? setFilter(null) : setFilter(initialFilter);
    }

    const [visible, setVisible] = React.useState(false);

    const toggleDialog = () => {
        setVisible(!visible);
    };

    return (
        <React.Fragment>
            <div className="row mb-3">
                <div className="col-md-8">
                    <Button themeColor="primary">
                        <Link to="/user/create">Создать</Link>
                    </Button>
                </div>
                <div className="col-md-4">
                    <Checkbox defaultValue={includeDismissed} onChange={handleChange} label="Включить в список уволенных сотрудников" />
                </div>
            </div>
            <Grid pageable={true}
                  data={filterBy(users, filter)} 
                  filterable={true} 
                  filter={filter} 
                  sort={sort}
                  sortable={true}
                  onSortChange={(e) => setSort(e.sort)}
                  onFilterChange={(e) => setFilter(e.filter)}>
                <GridColumn field="fullName" title="Имя" />
                <GridColumn field="role.name" title="Должность" filterCell={RoleFilterCell} />
                <GridColumn field="department.name" title="Отдел" filterCell={DepartmentFilterCell} />
                <GridColumn field="startDate" title="Дата трудоустройства" filter="date" format="{0:d}" />
                {includeDismissed &&
                    <GridColumn field="dismissed" filterCell={DismissedFilterCell} title="Статус"/>
                }
                <GridColumn filterable={false} cell={Action} className="d-flex justify-content-center" />
            </Grid>
            
            {visible && (
                <Dialog title={"Увольнение сотрудника"} onClose={toggleDialog}>
                    <p
                        style={{
                            margin: "25px",
                            textAlign: "center",
                        }}
                    >
                        Вы действительно хотите уволить сотрудника?
                    </p>
                    <DialogActionsBar>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                            onClick={toggleDialog}
                        >
                            Нет
                        </button>
                        <button
                            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
                            onClick={toggleDialog}
                        >
                            Да
                        </button>
                    </DialogActionsBar>
                </Dialog>
            )}
        </React.Fragment>
    )
}

export default ListUsers;