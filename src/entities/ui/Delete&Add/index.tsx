import {Button} from "../../../shared/ui";
import {Link} from "react-router-dom";
import {Buttons} from "./index.css";

interface typePropsDeleteAndAdd {
    addHandle:(()=>void)|string,
    deleteHandle:(()=>void)|string,
    sizeActive: number
}
function DeleteAndAdd(props:typePropsDeleteAndAdd) {
    return <Buttons $head>
        { props.sizeActive !== 0 && <Buttons>
            <span>{props.sizeActive} selected</span>
            {
                typeof props.deleteHandle === "string" ?
                    <Link to={props.deleteHandle}>
                        <Button text={'Delete'}/>
                    </Link> : <Button onClick={props.deleteHandle} text={'Delete'}/>
            }
            </Buttons>
        }
        {
        typeof props.addHandle === "string" ?
        <Link to={props.addHandle}>
            <Button text={'Add'}/>
        </Link> : <Button onClick={props.addHandle} text={'Add'}/>
    }

    </Buttons>
}

export default DeleteAndAdd;