import {Checkbox, InputText} from "../../../shared/ui";
import {typeCompany, typeEmployeeWithoutCompany, useCheckboxContext} from "../../../shared/lib";
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
            <thead>
                <Tr $classTr={"head"}>
                    {props.head.map((el,index)=>el==="id" ? <Th key={index}>Checkbox</Th> : <Th key={index}>{el as string}</Th>)}
                </Tr>
            </thead>
            <tbody>
                {props.body.map(row => <Tr key={row.id} className={ctx.activeCheckboxes.has(row.id)? "active" : ""} $classTr={ctx.activeCheckboxes.has(row.id)? "active" : undefined}>
                        {Object.entries(row).map((el:[string,string],index)=>{
                            switch (el[0]) {
                                case 'id':
                                    return <Td key={index}><Checkbox name={el[1]} default={ctx.activeCheckboxes.has(el[1])}/></Td>
                                default :
                                    if(typeof el[1] === "string" && el[0] !== "count")
                                        return <Td key={index}><InputText name={el[0]+row.id} default={el[1]}/></Td>
                                    return <Td key={index}>{el[1]}</Td>
                            }
                        })}
                    </Tr>)
                }
                {props.children}
            </tbody>
        </Table>
    );
}

export default MyTable;