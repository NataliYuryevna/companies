import type {typeCompany} from "../../../shared/lib/server";
import {Table} from "../../../entities/ui";
import {companyUpdate, selectAllCompanies, useCompaniesSelector} from "../lib";
import {Fragment, useRef, useState} from "react";
import {InputProvider} from "../../../shared/ui";
import {useAppDispatch} from "../../index.store";

interface typePropsCompanies {
}

function Companies(props:typePropsCompanies) {

    const companies = useCompaniesSelector(selectAllCompanies);
    const dispatch= useAppDispatch();
    const refForm = useRef<HTMLFormElement>(null);
    function updateCompany(id: string, value:string) {
        if(!!companies.length) {
            let regex = new RegExp(`^${Object.keys(companies[0]).join('|')}`);
            const idCompany: string = id.replace(regex,'')
            regex = new RegExp(`${idCompany}$`);
            dispatch(
                companyUpdate(idCompany, id.replace(regex,'') as keyof typeCompany, value)
            )
        }
    }

    return (<Fragment>
        <form ref={refForm}>
            {!!companies.length && <InputProvider onInputUpdate={updateCompany}>
                <Table<typeCompany> body={companies} head={Object.keys(companies[0]) as Array<keyof typeCompany>}/>
            </InputProvider>}
        </form>
        </Fragment>
    );
}

export default Companies;