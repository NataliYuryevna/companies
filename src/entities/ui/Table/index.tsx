import {Checkbox, InputText} from "../../../shared/ui";
import {typeCompany, typeEmployee} from "../../../shared/lib/server";

interface typePropsTable<T> {
    head: Array<keyof T>,
    body: Array<T>
}

function Table<T extends typeCompany|typeEmployee>(props:typePropsTable<T>) {

    return (
        <table>
            <tr>
                {props.head.map(el=>el==="id" ? <th>Checkbox</th> : <th>{el as string}</th>)}
            </tr>
            {props.body.map(row => <tr key={row.id}>
                    {Object.entries(row).map((el:[string,string])=>{
                        switch (el[0]) {
                            case 'id':
                                return <td><Checkbox name={el[1]}/></td>
                            default :
                                if(typeof el[1] === "string" && el[0] !== "count")
                                    return <td><InputText name={el[0]+row.id} default={el[1]}/></td>
                                return <td>{el[1]}</td>
                        }
                    })}
                </tr>)
            }
        </table>
    );
}

export default Table;