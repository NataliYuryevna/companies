import React, {useEffect, useState} from 'react';
import {useDeferredValue, useInputContext} from "../../lib";
import {Input} from "./index.css";

interface typePropsInput {
    name: string,
    labelText?:string,
    default?: string,
    form?: boolean
}

function InputText(props:typePropsInput) {
    const [valueText, setValue] = useState<string>(props.default||'');
    const deferredText = useDeferredValue<string>(valueText, 500);
    const ctx = useInputContext();

    useEffect(()=>{
        if(deferredText !== (props.default||''))
            ctx.onInputUpdate(props.name, deferredText);
    },[deferredText])

    function changeHandel(e:React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return <>
        {props.labelText && <label htmlFor={props.name}>{props.labelText}</label>}
        <Input type={'text'} value={valueText} id={props.name} onChange={changeHandel} $form={!!props.form}/>
    </>;
}


export default InputText;
