import './index.css'
import React from "react";

interface propsButton {
    text: string
    onClick: () => void
    className?: 'primary'
    type?: "button" | "submit" | "reset"
}

function Button(props: propsButton) {
    function onClickButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        e.stopPropagation();
        props.onClick()
    }

    return <button type={props.type} onClick={onClickButton}
                   className={props.className || 'primary'}>{props.text}</button>
}

export default Button