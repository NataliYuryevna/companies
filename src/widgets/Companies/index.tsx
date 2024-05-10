import {Fragment, useState} from "react";
import Companies from "../../features/Companies/ui";
import {CheckboxProvider, useCheckboxContext} from "../../shared/ui";
import Employees from "../../features/Employees/ui";
import {useAppDispatch} from "../../features/index.store";
import {companyAdded, companyDelete, companyUpdate} from "../../features/Companies/lib";
import {employeeDelete} from "../../features/Employees/lib";
import {DeleteAndAdd} from "../../entities/ui";
import {Div} from "./index.css";

function WidgetCompanies() {

    const [activeCompany, setActiveCompany] = useState<Set<string>>(new Set());
    function addActiveCompany(id: string) {
        setActiveCompany(prev => new Set(prev.add(id)))
    }

    function deleteActiveCompany(id: string) {
        setActiveCompany(prev => {
            prev.delete(id);
            return new Set(prev)
        })
    }

    return(<>
        <Div>
            <CheckboxProvider onCheckboxDelete={deleteActiveCompany} onCheckboxAdd={addActiveCompany} activeCheckboxes={activeCompany}>
                <DeleteAndAddCompany/>
                <Companies/>
            </CheckboxProvider>
        </Div>
        {!!activeCompany.size && <WidgetEmployee activeCompanies={activeCompany}/>}
        </>
    );
}

function DeleteAndAddCompany() {
    const {activeCheckboxes} = useCheckboxContext();
    const dispatch = useAppDispatch();

    function deleteCompany() {
        dispatch(
            employeeDelete({companyIds:Array.from(activeCheckboxes)})
        )
        dispatch(
            companyDelete({ids:Array.from(activeCheckboxes)})
        )

    }

    return <DeleteAndAdd addHandle={"/newCompany"} deleteHandle={deleteCompany} sizeActive={activeCheckboxes.size}/>
}

function WidgetEmployee(props:{activeCompanies:Set<string>}) {

    const [activeEmployees, setActiveEmployees] = useState<Set<string>>(new Set());
    const [activeCompanyIds, setActiveIds] = useState<Map<string,number>>(new Map());

    function addActiveEmployees(id: string) {
        setActiveEmployees(prev => new Set(prev.add(id)))
    }

    function deleteActiveEmployees(id: string) {
        setActiveEmployees(prev => {
            prev.delete(id);
            return new Set(prev)
        })
    }

    return <Div>
        <CheckboxProvider onCheckboxDelete={deleteActiveEmployees} onCheckboxAdd={addActiveEmployees} activeCheckboxes={activeEmployees}>
            <DeleteAndAddEmployee activeCompanies={props.activeCompanies} companyIds={activeCompanyIds}/>
            <Employees ids={props.activeCompanies} setActiveCompanyIds={setActiveIds}/>
        </CheckboxProvider>
    </Div>
}

function DeleteAndAddEmployee(props:{activeCompanies:Set<string>, companyIds: Map<string, number>}) {
    const {activeCheckboxes} = useCheckboxContext();
    const dispatch = useAppDispatch();

    function deleteEmployee() {
        dispatch(
            employeeDelete({ids:Array.from(activeCheckboxes)})
        )
        props.companyIds.forEach((size, companyId)=> {
            dispatch(
                companyUpdate(companyId, 'count', -size)
            )
        })
    }

    return <DeleteAndAdd addHandle={'/newEmployee'} deleteHandle={deleteEmployee} sizeActive={activeCheckboxes.size}/>
}

export default WidgetCompanies;
