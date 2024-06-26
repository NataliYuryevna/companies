import React, {useState} from 'react';
import {useCheckboxContext} from "../../lib";

interface typePropsCheckbox {
    name: string,
    labelText?: string,
    default?: boolean
}

function Checkbox(props:typePropsCheckbox) {
    const [valueChecked, setValue] = useState<boolean>(props.default||false);
    const ctx = useCheckboxContext();

    function changeHandel(e:React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.checked);
        if(e.target.checked)
            ctx.onCheckboxAdd(props.name);
        else
            ctx.onCheckboxDelete(props.name);
    }

    return <>
        {props.labelText && <label htmlFor={props.name}>{props.labelText}</label>}
        <input type={'checkbox'} id={props.name} checked={valueChecked} onChange={changeHandel}/>
    </>;
}

export default Checkbox;
