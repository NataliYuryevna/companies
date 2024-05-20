import {useState} from "react";
import {Companies, Employees, companyDelete, companyUpdate, employeeDelete} from "../../features";
import {CheckboxProvider, useCheckboxContext} from "../../shared/lib";
import {useAppDispatch} from "../../features/index.store";
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
    const {activeCheckboxes, onCheckboxDelete} = useCheckboxContext();
    const dispatch = useAppDispatch();

    function deleteCompany() {
        console.log('hjkjhkj');
        dispatch(
            employeeDelete({companyIds:Array.from(activeCheckboxes)})
        )
        dispatch(
            companyDelete({ids:Array.from(activeCheckboxes)})
        )
        activeCheckboxes.forEach(checkbox => onCheckboxDelete(checkbox));

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
    const {activeCheckboxes, onCheckboxDelete} = useCheckboxContext();
    const dispatch = useAppDispatch();

    function deleteEmployee() {
        dispatch(
            employeeDelete({ids:Array.from(activeCheckboxes)})
        )
        props.companyIds.forEach((size, companyId)=> {
            dispatch(
                companyUpdate(companyId, 'count', -size)
            )
        });
        activeCheckboxes.forEach(checkbox => onCheckboxDelete(checkbox));

    }

    return <DeleteAndAdd addHandle={'/newEmployee'} deleteHandle={deleteEmployee} sizeActive={activeCheckboxes.size}/>
}

export default WidgetCompanies;
