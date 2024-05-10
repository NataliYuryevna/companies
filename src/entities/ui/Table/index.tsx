import {Checkbox, InputText, useCheckboxContext} from "../../../shared/ui";
import {typeCompany, typeEmployeeWithoutCompany} from "../../../shared/lib/server";
import {PropsWithChildren} from "react";
import {Table, Td, Th, Tr} from "./index.css";

interface typePropsTable<T> {
    head: Array<keyof T>,
    body: Array<T>
}

function MyTable<T extends typeCompany|typeEmployeeWithoutCompany>(props:PropsWithChildren<typePropsTable<T>>) {

    const ctx = useCheckboxContext();

    return (
        <Table>
            <Tr $classTr={"head"}>
                {props.head.map(el=>el==="id" ? <Th>Checkbox</Th> : <Th>{el as string}</Th>)}
            </Tr>
            {props.body.map(row => <Tr key={row.id} className={ctx.activeCheckboxes.has(row.id)? "active" : ""} $classTr={ctx.activeCheckboxes.has(row.id)? "active" : undefined}>
                    {Object.entries(row).map((el:[string,string])=>{
                        switch (el[0]) {
                            case 'id':
                                return <Td><Checkbox name={el[1]} default={ctx.activeCheckboxes.has(el[1])}/></Td>
                            default :
                                if(typeof el[1] === "string" && el[0] !== "count")
                                    return <Td><InputText name={el[0]+row.id} default={el[1]}/></Td>
                                return <Td>{el[1]}</Td>
                        }
                    })}
                </Tr>)
            }
            {props.children}
        </Table>
    );
}

export default MyTable;