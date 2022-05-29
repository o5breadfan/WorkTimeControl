import React, { useEffect, useState } from "react";
import departmentService from "../../services/departmentService"
import {Button, DropDownButton} from "@progress/kendo-react-buttons";
import {Window} from "@progress/kendo-react-dialogs";
import {Label} from "@progress/kendo-react-labels";
import {Field, Form, FormElement} from "@progress/kendo-react-form";
import ValidationInput from "../utils/ValidationInput";
import {Grid, GridColumn} from "@progress/kendo-react-grid";
import {DropDownList} from "@progress/kendo-react-dropdowns";
import {getter, orderBy} from "@progress/kendo-data-query";
import {Alert} from "react-bootstrap";
import userServices from "../../services/userService";
import {showError} from "../../utils/notifyHelper";
import {Link} from "react-router-dom";
import {RoleType} from "../../utils/constants";

const nameGetter = getter("name");
const initialSort = [
    {
        field: "createDate",
        dir: "desc",
    },
];

export default function ListDepartments() {
    const [departments, setDepartments] = useState();
    const [users, setUsers] = useState();
    const [sort, setSort] = useState(initialSort);
    const [filter, setFilter] = useState();
    const [visibleWindow, setVisibleWindow] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [message, setMessage] = useState();
    const [state, setState] = useState({
        user: null,
        name: null
    });
    
    useEffect(() => {
        departmentService.getDepartmentsDetail()
            .then(result => {
                result.map(x => {
                    x.createDate = x.createDate ? new Date(x.createDate).toLocaleString('ru') : null;
                    x.headFullName = x.head ? (x.head.surname + " " + x.head.name) : ""
                });
                setDepartments(result)
            });
    }, [])

    useEffect(() => {
        userServices.getAllUserNames()
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                showError(error);
            })
    }, []);
    
    const handleChange = (event) => {
        let name = event.target.name || event.target.element.current.name;
        setState({ ...state, [name]: event.target.value });
    };
    
    const toggleWindow = (department) => {
        if(department) {
            department.head = {
                ...department.head,
                name: department.headFullName
            }
            state.user = department.head
            state.name = department.name
        }
        setVisibleWindow(!visibleWindow);
    };

    const handleSubmit = (event) => {
        if (event) {
            event['headId'] = state.user ? state.user.id : null;
            
            departmentService.create(event)
                .then(newDepartment => {
                    if (newDepartment) {
                        const data = [...departments];
                        newDepartment = {...newDepartment, 
                            createDate: newDepartment.createDate ? new Date(newDepartment.createDate).toLocaleString('ru') : null,
                            headFullName: newDepartment.head ? (newDepartment.head.surname + " " + newDepartment.head.name) : ""}
                        data.unshift(newDepartment);
                        setDepartments(data);
                        
                        setVisibleWindow(false);
                        setSort(initialSort);
                        
                        setMessage("Отдел успешно добавлен!")
                        setVisibleAlert(true);
                    }
                })
        } else {
            alert(JSON.stringify(event, null, 2));
        }
    }
    const formValidator = (values) => {
        if (nameGetter(values)) {
            return;
        }

        return {
            VALIDATION_SUMMARY: "Пожалуйста, заполните все обязательные поля.",
            ["name"]:
                "Поле обязательно для заполнения."
        };
    };

    const userComponent = () => {
        return <DropDownList
            id="userId"
            name="user"
            data={users}
            textField="name"
            dataItemKey="id"
            defaultItem={{ name: "выберите руководителя..." }}
            value={state.user}
            onChange={handleChange}
        />
    }

    const dropDownButtonItems = () => {
        return ["Редактировать", "Удалить"]
    }
    
    const onItemClick = (button) => {
        switch (button.item) {
            case "Редактировать":
                toggleWindow(button.target.props.department);
                break;
            case "Удалить":
                departmentService.delete(button.target.props.department.id)
                    .then(result => {
                        if(result){
                            const data = [...departments];
                            let index = data.findIndex((record) => record.id === button.target.props.department.id);
                            data.splice(index, 1);
                            setDepartments(data);

                            setMessage("Отдел успешно удален!")
                            setVisibleAlert(true);
                        }
                    });
                break;
            default:
                break;
        }
    };
    
    const Action = (props) => {
        return <td className="text-center">
            <DropDownButton key={props.dataItem.id} items={dropDownButtonItems()}
                            text="Действия"
                            department={props.dataItem}
                            onItemClick={onItemClick} />
        </td>
    };
    
    const Head = (props) => {
        return <td>
            {props.dataItem.head &&
                <Link to={`/list/${props.dataItem.head.id}/edit`}>{props.dataItem.headFullName}</Link>
            }
        </td>
    }
    
    return <div>
        {!visibleWindow && <div>
            {visibleAlert && 
            <Alert variant="success">
                {message}
            </Alert>}
            <div className="mb-3">
                <Button themeColor="primary" onClick={toggleWindow}>Создать</Button>
            </div>

            <Grid pageable={true}
                  data={ departments ? orderBy(departments, sort) : departments}
                  sortable={true}
                  sort={sort}
                  onSortChange={(e) => setSort(e.sort)}
                  filterable={true}
                  filter={filter}
                  onFilterChange={(e) => setFilter(e.filter)}>
                <GridColumn field="name" title="Наименование" />
                <GridColumn field="headFullName" title="Руководитель" cell={Head} />
                <GridColumn field="createDate" title="Дата создания" filter="date" format="{0:D}" />
                <GridColumn filterable={false} cell={Action} className="d-flex justify-content-center" />
            </Grid>
        </div>
        }

        {visibleWindow &&  <Window title={"Отдел"} onClose={toggleWindow} initialWidth={300} style={{height:"auto"}}>
            <Form onSubmit={handleSubmit}
                  initialValues={{
                      name: state.name
                  }}
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
                                  <div className="col-md-12 text-md-right">
                                      <Label>Наименование:</Label>
                                      <Field name="name" component={ValidationInput}/>
                                  </div>
                              </div>

                              <div className="row mb-3 justify-content-center">
                                  <div className="col-md-12 text-md-right">
                                      <Label>Руководитель:</Label>
                                      <Field name="headOfDepartment" component={userComponent} />
                                  </div>
                              </div>

                              <div className="row justify-content-center">
                                  <div className="col-md-12 text-md-right">
                                      <Button className="mr-2" onClick={toggleWindow}>
                                          Отменить
                                      </Button>
                                      <Button type="submit"
                                              themeColor="primary"
                                              disabled={!formRenderProps.allowSubmit}
                                              className="mr-2"
                                      >
                                          Создать
                                      </Button>
                                  </div>
                              </div>
                          </FormElement>
                      </div>
                  )}>
            </Form>
        </Window>
        }
    </div>
    
}