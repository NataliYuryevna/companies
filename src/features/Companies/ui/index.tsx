import type {typeCompany} from "../../../shared/lib";
import {Table} from "../../../entities/ui";
import {companyUpdate, selectActiveCompanies, useCompaniesSelector} from "../lib";
import {InputProvider} from "../../../shared/lib";
import {useAppDispatch} from "../../index.store";
import {useEffect, useState} from "react";

interface typePropsCompanies {
}

function Companies(props:typePropsCompanies) {
    const count = 10;
    const [argForSelector, setArgForSelector] = useState<{count:number, lastId?: string}>({count});
    const companies = useCompaniesSelector((state)=>selectActiveCompanies(state, argForSelector));
    const dispatch= useAppDispatch();

    useEffect(() => {
        setArgForSelector({count});
    }, []);
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

    function moreCompanies() {
        let lastId = undefined;
        if(companies.length > 0)
            lastId = companies[companies.length - 1].id
        setArgForSelector({count, lastId})
    }

    return (<>
            {!!companies.length && <InputProvider onInputUpdate={updateCompany}>
                <Table<typeCompany> body={companies} head={Object.keys(companies[0]) as Array<keyof typeCompany>}>
                    {companies.length % count === 0 &&
                        <tr>
                            <td onClick={moreCompanies}>more...</td>
                        </tr>
                    }
                </Table>
            </InputProvider>}
        </>
    );
}

export default Companies;