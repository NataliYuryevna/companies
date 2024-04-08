import {Fragment, useEffect, useState} from 'react';
import {useDeferredValue} from "../../lib/hooks";
import {useInputContext} from "./input.context";

interface typePropsInput {
    name: string,
    labelText?:string,
    default?: string
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

    return <Fragment>
        {props.labelText && <label htmlFor={props.name}>{props.labelText}</label>}
        <input type={'text'} value={valueText} id={props.name} onChange={changeHandel}/>
    </Fragment>;
}


export default InputText;
