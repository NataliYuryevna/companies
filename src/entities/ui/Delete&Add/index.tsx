import {Button} from "../../../shared/ui";
import {Link} from "react-router-dom";

interface typePropsDeleteAndAdd {
    addHandle:(()=>void)|string,
    deleteHandle:(()=>void)|string
}
function DeleteAndAdd(props:typePropsDeleteAndAdd) {
    return <>{
        typeof props.addHandle === "string" ?
        <Link to={props.addHandle}>
            <Button text={'Добавить'}/>
        </Link> : <Button onClick={props.addHandle} text={'Добавить'}/>
    }
        {
            typeof props.deleteHandle === "string" ?
                <Link to={props.deleteHandle}>
                    <Button text={'Удалить'}/>
                </Link> : <Button onClick={props.deleteHandle} text={'Удалить'}/>
        }
    </>
}

export default DeleteAndAdd;