interface typeEmployee {
    "id": string,
    "surname": string
    "name": string,
    "position": string,
    "companyId": string
}
type typeEmployeeWithoutCompany = Omit<typeEmployee, 'companyId'>;
export type {typeEmployee, typeEmployeeWithoutCompany}