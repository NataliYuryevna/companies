import {useAppDispatch} from "../../features/index.store";
import {employeeAdded, companyUpdate, selectAllCompanies, useCompaniesSelector} from "../../features";
import {useState} from "react";
import type {typeDefaultEmp, typeEmployeeWithoutId, typeCompany} from "../../shared/lib";
import {InputProvider} from "../../shared/lib";
import {Form} from "../../entities/ui";

function AddEmployee() {
    const dispatch = useAppDispatch();
    const companies = useCompaniesSelector(selectAllCompanies);
    const [newEmployee, setNewEmployee] = useState<typeDefaultEmp|typeEmployeeWithoutId>({name:'', surname:'', position:'', companyId:companies.map(com=>({id:com.id, value:com.name}))});
    const defaultEmployee = {name:'', surname:'', position:'', companyId:companies.map(com=>({id:com.id, value:com.name}))}

    function addNewEmployee() {
        if(companies.length) {
            dispatch(
                employeeAdded(newEmployee.name, newEmployee.surname, newEmployee.position, newEmployee.companyId as string)
            )
            dispatch(
                companyUpdate(newEmployee.companyId as string, 'count', 1)
            )
        }
    }
    function canselNewEmployee() {
        setNewEmployee(defaultEmployee)
    }

    function updateEmployee(id: string, value: string) {
        setNewEmployee(emp=>({...emp, [id]:value}))
    }

    return <InputProvider onInputUpdate={updateEmployee}>
        <Form<typeDefaultEmp|typeEmployeeWithoutId> addHandle={addNewEmployee} default={defaultEmployee} canselHandle={canselNewEmployee}/>
    </InputProvider>
}

export default AddEmployee;