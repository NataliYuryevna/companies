import {useAppDispatch} from "../../features/index.store";
import {employeeAdded} from "../../features/Employees/lib";
import {companyUpdate, selectAllCompanies, useCompaniesSelector} from "../../features/Companies/lib";
import {useState} from "react";
import {typeEmployee} from "../../shared/lib/server";
import {InputProvider} from "../../shared/ui";
import {Form} from "../../entities/ui";

function AddEmployee() {
    const dispatch = useAppDispatch();
    const companies = useCompaniesSelector(selectAllCompanies);
    const [newEmployee, setNewEmployee] = useState<Omit<typeEmployee,'id'>>({name:'', surname:'', position:'', companyId:companies[0].id});

    function addNewEmployee() {
        if(companies.length) {
            dispatch(
                employeeAdded(newEmployee.name, newEmployee.surname, newEmployee.position, newEmployee.companyId)
            )
            dispatch(
                companyUpdate(newEmployee.companyId, 'count', 1)
            )
        }
    }
    function canselNewEmployee() {
        setNewEmployee({name:'', surname:'', position:'', companyId:companies[0].id})
    }

    function updateEmployee(id: string, value: string) {
        setNewEmployee(emp=>({...emp, [id]:value}))
    }

    return <InputProvider onInputUpdate={updateEmployee}>
        <Form<Omit<typeEmployee,'id'>> addHandle={addNewEmployee} default={newEmployee} canselHandle={canselNewEmployee}/>
    </InputProvider>
}

export default AddEmployee;