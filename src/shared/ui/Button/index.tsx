import './index.css'
import React from "react";

interface propsButton {
    text: string
    onClick?: () => void
    className?: 'primary'
    type?: "button" | "submit" | "reset" | "cancel"
}

function Button(props: propsButton) {
    function onClickButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(props.onClick && (!props.type && props.type === "button")) {
            e.preventDefault();
            e.stopPropagation();
            props.onClick();
        } else if(props.onClick)
            props.onClick();
    }

    return <button type={props.type && props.type === "cancel" ? "button" : props.type} onClick={onClickButton}
                   className={props.className || 'primary'}>{props.text}</button>
}

export default Button