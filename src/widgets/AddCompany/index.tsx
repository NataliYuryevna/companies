import {useAppDispatch} from "../../features/index.store";
import {companyAdded} from "../../features";
import {useState} from "react";
import type {typeCompany} from "../../shared/lib";
import {InputProvider} from "../../shared/lib";
import {Form} from "../../entities/ui";

function AddCompany() {
    const [newCompany, setNewCompany] = useState<Omit<typeCompany,'id'|'count'>>({name:'', address:''});

    const dispatch = useAppDispatch();

    function addNewCompany() {
        dispatch(
            companyAdded(newCompany.name, newCompany.address)
        )
    }
    function canselNewCompany() {
        setNewCompany({name:'', address:''})
    }

    function updateCompany(id: string, value: string) {
        setNewCompany(comp=>({...comp, [id]:value}))
    }

    return <InputProvider onInputUpdate={updateCompany}>
        <Form<Omit<typeCompany,'id'|'count'>> addHandle={addNewCompany} default={newCompany} canselHandle={canselNewCompany}/>
    </InputProvider>
}

export default AddCompany;