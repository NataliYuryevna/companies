import React, {useState} from "react";
import {useInputContext} from "../../lib";
import {Select} from "./index.css";

interface typePropsSelect {
    name: string,
    options: Array<{id:string, value:string}>,
    labelText?:string,
    default?: string,
    form?: boolean
}

function MySelect(props:typePropsSelect) {
    const [valueSelect, setValue] = useState<string|undefined>(props.default);
    const ctx = useInputContext();

    function changeHandel(e:React.ChangeEvent<HTMLSelectElement>) {
        setValue(e.target.value);
        ctx.onInputUpdate(props.name, e.target.value);
    }

    return <>
        {props.labelText && <label htmlFor={props.name}>{props.labelText}</label>}
        <Select id={props.name} onChange={changeHandel} $form={props.form}>
            {props.options.map(option=> <option value={option.id} selected={!!valueSelect ? valueSelect === option.id : false}>{option.value}</option>)}
        </Select>
    </>;
}


export default MySelect;