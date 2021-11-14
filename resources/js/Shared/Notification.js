import React from "react";

const Notification = ({ type, message }) => {
    if (type === "success") {
        return <>{toastr.success(message)}</>;
    } else if (type === "error") {
        return <>{toastr.error(message)}</>;
    } else if (type === "info") {
        return <>{toastr.info(message)}</>;
    } else {
        return <></>;
    }
};

export default Notification;
