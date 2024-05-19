import type {typeEmployee, typeEmployeeWithoutCompany} from "../../../shared/lib";
import {Table} from "../../../entities/ui";
import {employeeUpdate, selectActiveEmployees, useEmployeesSelector} from "../lib";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../index.store";
import {InputProvider, useCheckboxContext} from "../../../shared/lib";

interface typePropsEmployees {
    ids:Set<string>,
    setActiveCompanyIds: (ids:Map<string, number>)=>void
}

function Employees(props:typePropsEmployees) {
    const count = 10;
    const [argForSelector, setArgForSelector] = useState<{companyIds:Set<string>, count?:number, lastId?: string}|undefined>(undefined);
    const employees = useEmployeesSelector((state)=>selectActiveEmployees(state, argForSelector));
    const {activeCheckboxes} = useCheckboxContext();
    const [bodyEmployees, setBody] = useState<Array<typeEmployeeWithoutCompany>>([]);
    const dispatch= useAppDispatch();

    useEffect(() => {
        setArgForSelector({companyIds: props.ids, count});
    }, [props.ids]);

    useEffect(()=>{
        setBody(employees.map(employee=>({
            id:employee.id,
            surname: employee.surname,
            name: employee.name,
            position: employee.position
        })))
    },[employees])

    useEffect(() => {
        if(activeCheckboxes.size) {
            const activeCompanyIds: Map<string, number> = new Map();
            activeCheckboxes.forEach(id => {
                const employee = employees.find(el => el.id === id);
                if (employee && props.ids.has(employee.companyId)) {
                    activeCompanyIds.set(employee.companyId, ((activeCompanyIds.get(employee.companyId) || 0) + 1));
                }
            })
            props.setActiveCompanyIds(activeCompanyIds);
        }
    }, [activeCheckboxes]);

    function updateEmployee(id: string, value:string) {
        if(!!employees.length) {
            let regex = new RegExp(`^${Object.keys(employees[0]).join('|')}`);
            const idEmployee: string = id.replace(regex,'')
            regex = new RegExp(`${idEmployee}$`);
            dispatch(
                employeeUpdate(idEmployee, id.replace(regex,'') as keyof typeEmployee, value)
            )
        }
    }

    function moreEmployees() {
        let lastId = undefined;
        if(bodyEmployees.length > 0)
            lastId = bodyEmployees[bodyEmployees.length - 1].id
        setArgForSelector({companyIds:props.ids, count, lastId})
    }

    return (
        <>
            {!!bodyEmployees.length && <InputProvider onInputUpdate={updateEmployee}>
                <Table<typeEmployeeWithoutCompany> body={bodyEmployees} head={Object.keys(bodyEmployees[0]) as Array<keyof typeEmployeeWithoutCompany>}>
                    {bodyEmployees.length % count === 0 &&
                    <tr>
                        <td onClick={moreEmployees}>more...</td>
                    </tr>}
                </Table>
            </InputProvider>}
        </>
    );
}

export default Employees;