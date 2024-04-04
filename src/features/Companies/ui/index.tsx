import type {typeCompany} from "../../../shared/lib/server";
import {Table} from "../../../entities/ui";
import {selectAllCompanies, useCompaniesSelector} from "../lib";

interface typePropsCompanies {
}

function Companies(props:typePropsCompanies) {

    const companies = useCompaniesSelector(selectAllCompanies);

    return (
        <form>
        <Table<typeCompany> body={companies} head={Object.keys(companies[0]) as Array<keyof typeCompany>}/>
        </form>
    );
}

export default Companies;