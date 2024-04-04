import React, {Fragment, useState} from 'react';

interface typePropsInput {
    name: string,
    labelText?:string,
    default?: string
}

function InputText(props:typePropsInput) {
    const [valueText, setValue] = useState<string>(props.default||'');

    function changeHandel(e:React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    return <Fragment>
        {props.labelText && <label htmlFor={props.name}>{props.labelText}</label>}
        <input type={'text'} value={valueText} id={props.name} onChange={changeHandel}/>
    </Fragment>;
}

export default InputText;
