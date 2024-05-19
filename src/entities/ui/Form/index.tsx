import {Button, InputText, Select} from "../../../shared/ui";
import {typeCompany, typeEmployee, typeDefaultEmp} from "../../../shared/lib";
import {Link} from "react-router-dom";
import {Form, Buttons} from './index.css'

interface typePropsForm<T extends Omit<typeCompany|typeEmployee,'id'|'count'>> {
    addHandle:()=>void,
    canselHandle:()=>void,
    default: T
}
function MyForm<T extends Omit<typeCompany|typeEmployee,'id'|'count'>|typeDefaultEmp>( props:typePropsForm<T>) {

    return <Form>
        {Object.keys(props.default).map(name=>typeof props.default[name  as keyof T] === 'object' ?
            <Select name={name} labelText={name} options={props.default[name  as keyof T] as Array<{id:string, value:string}>} form={true}/>
            : <InputText name={name} labelText={name} default={ String(props.default[name as keyof T])} form={true} />)}
        <Buttons>
            <Link to={'/'}>
            <Button type="cancel" onClick={props.canselHandle} text={'Cancel'}/>
            </Link>
            <Link to={'/'}>
                <Button type="submit" onClick={props.addHandle} text={'Add'}/>
            </Link>
        </Buttons>
    </Form>
}

export default MyForm;