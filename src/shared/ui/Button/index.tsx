import './index.css'
import React from "react";
import {Button} from "./index.css";

interface propsButton {
    text: string
    onClick?: () => void
    className?: 'primary'
    type?: "button" | "submit" | "reset" | "cancel"
}

function MyButton(props: propsButton) {
    function onClickButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(props.onClick && (!props.type && props.type === "button")) {
            e.preventDefault();
            e.stopPropagation();
            props.onClick();
        } else if(props.onClick) {
            props.onClick();
        }
    }

    return <Button type={props.type && props.type === "cancel" ? "button" : props.type} onClick={onClickButton}
                   $primary={!props.className}>{props.text}</Button>
}

export default MyButton