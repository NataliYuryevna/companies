import type {typeEmployeeWithoutCompany} from "../../../shared/lib/server";
import {Table} from "../../../entities/ui";
import {selectAllEmployees, useEmployeesSelector} from "../lib";
import {useEffect, useState} from "react";

interface typePropsEmployees {
    ids:Set<string>
}

function Employees(props:typePropsEmployees) {

    const employees = useEmployeesSelector(selectAllEmployees);
    const [bodyEmployees, setBody] = useState<Array<typeEmployeeWithoutCompany>>([]);

    useEffect(()=>{
        setBody(employees.filter(employee=>props.ids.has(employee.companyId)).map(employee=>({
            id:employee.id,
            surname: employee.surname,
            name: employee.name,
            position: employee.position
        })))
    },[props.ids])

    return (
        <form>
            {!!bodyEmployees.length && <Table<typeEmployeeWithoutCompany> body={bodyEmployees} head={Object.keys(bodyEmployees[0]) as Array<keyof typeEmployeeWithoutCompany>}/>}
        </form>
    );
}

export default Employees;