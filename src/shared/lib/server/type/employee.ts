import {typeCompany} from "../index";

interface typeEmployee {
    "id": string,
    "name": string,
    "surname": string,
    "position": string,
    "companyId": string
}
type typeEmployeeWithoutCompany = Omit<typeEmployee, 'companyId'>;
type typeEmployeeWithoutId = Omit<typeEmployee, 'id'>;
type typeDefaultEmp = Omit<typeEmployee,'id'|'companyId'> & {
    companyId: Array<{id: typeCompany['id'], value: typeCompany['name']}>
}
export type {typeEmployee, typeEmployeeWithoutCompany, typeEmployeeWithoutId, typeDefaultEmp}