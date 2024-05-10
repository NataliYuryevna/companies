import {Button, InputText} from "../../../shared/ui";
import {typeCompany, typeEmployee} from "../../../shared/lib/server";
import {Link} from "react-router-dom";
import {Form} from './index.css'

interface typePropsForm<T extends Omit<typeCompany|typeEmployee,'id'|'count'>> {
    addHandle:()=>void,
    canselHandle:()=>void,
    default: T
}
function MyForm<T extends Omit<typeCompany|typeEmployee,'id'|'count'>>( props:typePropsForm<T>) {

    return <Form>
        {Object.keys(props.default).map(name=><InputText name={name as string} labelText={name as string} default={ String(props.default[name as keyof T])} />)}
        <div>
            <Link to={'/'}>
            <Button type="submit" onClick={props.addHandle} text={'Добавить'}/>
            </Link>
            <Link to={'/'}>
            <Button type="cancel" onClick={props.canselHandle} text={'Отмена'}/>
            </Link>
        </div>
    </Form>
}

export default MyForm;