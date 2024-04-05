import {Fragment, useState} from "react";
import Companies from "../../features/Companies/ui";
import {CheckboxProvider} from "../../shared/ui";
import Employees from "../../features/Employees/ui";

function WidgetCompanies() {

    const [activeCompany, setActiveCompany] = useState<Set<string>>(new Set());
    const [activeEmployees, setActiveEmployees] = useState<Set<string>>(new Set());
    function addActiveCompany(id: string) {
        setActiveCompany(prev => new Set(prev.add(id)))
    }

    function deleteActiveCompany(id: string) {
        setActiveCompany(prev => {
            prev.delete(id);
            return new Set(prev)
        })
    }

    function addActiveEmployees(id: string) {
        setActiveEmployees(prev => new Set(prev.add(id)))
    }

    function deleteActiveEmployees(id: string) {
        setActiveEmployees(prev => {
            prev.delete(id);
            return new Set(prev)
        })
    }

    return(<Fragment>
            <CheckboxProvider onCheckboxDelete={deleteActiveCompany} onCheckboxAdd={addActiveCompany} activeCheckboxes={activeCompany}>
                <Companies/>
            </CheckboxProvider>
            {!!activeCompany.size && <CheckboxProvider onCheckboxDelete={deleteActiveEmployees} onCheckboxAdd={addActiveEmployees} activeCheckboxes={activeEmployees}>
                <Employees ids={activeCompany}/>
            </CheckboxProvider>}

        </Fragment>
    );
}

export default WidgetCompanies;