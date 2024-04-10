import {Button} from "../../../shared/ui";

interface typePropsDeleteAndAdd {
    addHandle:()=>void,
    deleteHandle:()=>void
}
function DeleteAndAdd(props:typePropsDeleteAndAdd) {
    return <>
        <Button onClick={props.addHandle} text={'Добавить'}/>
        <Button onClick={props.deleteHandle} text={'Удалить'}/>
    </>
}

export default DeleteAndAdd;