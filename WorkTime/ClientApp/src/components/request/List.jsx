import {Grid, GridColumn} from "@progress/kendo-react-grid";
import * as React from 'react';
import {
    Button,
    DropDownButton
} from "@progress/kendo-react-buttons";
import {Link, useNavigate} from "react-router-dom";
import requestService from "../../services/requestService";
import moment from "moment";
import {showError} from "../../utils/notifyHelper";

const ListRequests = (props) => {
    const navigate = useNavigate();
    
    const onItemClick = (button) => {
        switch (button.item) {
            case "Редактировать":
                navigate(`/request/${button.target.props.request.id}/edit`);
                break;
            case "Отправить":
                console.log(props.item);
                break;
            case "Удалить":
                console.log(props.item);
                break;
            default:
                break;
        }

    }

    const [requests, setRequests] = React.useState();

    React.useEffect(() => {
        requestService.getRequests()
            .then(data => {
                data.forEach(x => {
                    x.createDate = moment(x.createDate).format("DD.MM.YYYY");
                    if(x.sendDate != null){
                        x.sendDate = moment(x.sendDate).format("DD.MM.YYYY");
                    } else(x.sendDate = '')
                })
                setRequests(data);
            })
            .catch(error => {
                showError(error);
            })
    }, []);
    
    const Action = (props) => {
        return <td className="text-center">
            <DropDownButton key={props.dataItem.id} items={["Редактировать",
                "Отправить",
                "Удалить"]}
                text="Действия" 
                request={props.dataItem}
                onItemClick={onItemClick}>

            </DropDownButton>
        </td>
    };
    
    return <div>
        <div className="mb-3">
            <Link to="/request/create">
                <Button themeColor="primary">Создать</Button>
            </Link>
        </div>
        <Grid pageable={true} data={requests}
              filterable={true}
              sortable={true}>
            <GridColumn field="requestType.name" title="Тип заявки" />
            <GridColumn field="createDate" title="Дата создания" filter="date" />
            <GridColumn field="sendDate" title="Дата отправки" filter="date" format="{0:d}" />
            <GridColumn field="user.fullName" title="Сотрудник" />
            <GridColumn field="approver.fullName" title="Согласующий" />
            <GridColumn field="requestStatus.name" title="Статус" />
            <GridColumn cell={Action}/>
        </Grid>
    </div>
}

export default ListRequests;