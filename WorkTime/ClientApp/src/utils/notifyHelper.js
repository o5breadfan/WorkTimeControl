import { Notification } from "@progress/kendo-react-notification";
import React from "react";

export const showError = (message) => {
    return <Notification
    type={{
        style: "error",
        icon: true
    }}
    >
        <span>{message}</span>
    </Notification>
}