import type {typeEmployee, typeEmployeeWithoutCompany} from "../../../shared/lib/server";
import {Table} from "../../../entities/ui";
import {employeeUpdate, selectAllEmployees, useEmployeesSelector} from "../lib";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../index.store";
import {InputProvider, useCheckboxContext} from "../../../shared/ui";

interface typePropsEmployees {
    ids:Set<string>,
    setActiveCompanyIds: (ids:Map<string, number>)=>void
}

function Employees(props:typePropsEmployees) {

    const employees = useEmployeesSelector(selectAllEmployees);
    const {activeCheckboxes} = useCheckboxContext();
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

    useEffect(() => {
        const activeCompanyIds:Map<string,number> =new Map();
        activeCheckboxes.forEach(id=>{
            const employee = employees.find(el=>el.id === id);
            if(employee && props.ids.has(employee.companyId)) {
                activeCompanyIds.set(employee.companyId, ((activeCompanyIds.get(employee.companyId)||0) + 1));
            }
        })
        props.setActiveCompanyIds(activeCompanyIds);
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

    return (
        <form>
            {!!bodyEmployees.length && <InputProvider onInputUpdate={updateEmployee}>
                <Table<typeEmployeeWithoutCompany> body={bodyEmployees} head={Object.keys(bodyEmployees[0]) as Array<keyof typeEmployeeWithoutCompany>}/>
            </InputProvider>}
        </form>
    );
}

export default Employees;