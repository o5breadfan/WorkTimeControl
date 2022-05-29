import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import React from "react";

export default function UserActionPopup(props) {
    const {visible, title, message, user} = props;

    const onCloseDialog = () => {
        
    }

    return <div>
        {visible && (
                <Dialog title={title} onClose={toggleDialog}>
                <p
                    style={{
                    margin: "25px",
                    textAlign: "center",
                    }}
                >
                    {message}
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
    </div>
}