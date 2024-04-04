import React, {Fragment, useState} from 'react';

interface typePropsCheckbox {
    name: string,
    labelText?: string
}

function Checkbox(props:typePropsCheckbox) {
    const [valueChecked, setValue] = useState<boolean>(false);

    function changeHandel(e:React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.checked);
    }

    return <Fragment>
        {props.labelText && <label htmlFor={props.name}>{props.labelText}</label>}
        <input type={'checkbox'} id={props.name} checked={valueChecked} onChange={changeHandel}/>
    </Fragment>;
}

export default Checkbox;
