import type {typeEmployee, typeEmployeeWithoutCompany} from "../../../shared/lib/server";
import {Table} from "../../../entities/ui";
import {employeeAdded, employeeUpdate, selectAllEmployees, useEmployeesSelector} from "../lib";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../index.store";
import {Button, InputProvider} from "../../../shared/ui";
import {companyUpdate} from "../../Companies/lib";

interface typePropsEmployees {
    ids:Set<string>
}

function Employees(props:typePropsEmployees) {

    const employees = useEmployeesSelector(selectAllEmployees);
    const [bodyEmployees, setBody] = useState<Array<typeEmployeeWithoutCompany>>([]);
    const dispatch= useAppDispatch();

    useEffect(()=>{
        setBody(employees.filter(employee=>props.ids.has(employee.companyId)).map(employee=>({
            id:employee.id,
            surname: employee.surname,
            name: employee.name,
            position: employee.position
        })))
    },[props.ids, employees])

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

    function addNewEmployee() {
        const keys = props.ids.keys();
        const id = keys.next().value;
        dispatch(
            employeeAdded('','','', id)
        )
        dispatch(
            companyUpdate(id, 'count', 1)
        )
    }

    return (
        <form>
            <Button onClick={addNewEmployee} text={'Добавить'}/>
            {!!bodyEmployees.length && <InputProvider onInputUpdate={updateEmployee}>
                <Table<typeEmployeeWithoutCompany> body={bodyEmployees} head={Object.keys(bodyEmployees[0]) as Array<keyof typeEmployeeWithoutCompany>}/>
            </InputProvider>}
        </form>
    );
}

export default Employees;