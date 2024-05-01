import {createSelector, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {employeesMock, typeCompany} from "../../../../shared/lib/server";
import type {typeEmployee} from "../../../../shared/lib/server";

const employeeSlice = createSlice({
    name: 'employee',
    initialState: employeesMock,
    reducers: {
        employeeAdded: {
            reducer(state, action: PayloadAction<typeEmployee>) {
                state.push(action.payload)
            },
            prepare(name: string, surname: string, position: string, companyId: string) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        surname,
                        position,
                        companyId
                    }
                }
            }
        },
        employeeDelete(state, action: PayloadAction<{ids?:Array<string>, companyIds?:Array<string>}>) {
            if(action.payload.ids && action.payload.ids.length)
                return state.filter(el=>!action.payload.ids?.includes(el.id))
            else if(action.payload.companyIds && action.payload.companyIds.length)
                return state.filter(el=>!action.payload.companyIds?.includes(el.companyId))
        },
        employeeUpdate: {
            reducer(state, action: PayloadAction<{id:string, name: keyof typeEmployee, value: string}>) {
                return state.map(el=>el.id === action.payload.id ? {...el, [action.payload.name]: action.payload.value} : el);
            },
            prepare(id:string, name: keyof typeEmployee, value: string) {
                return {
                    payload: {
                        id,
                        name,
                        value
                    }
                }
            }
        }
    }
})

export const selectActiveEmployees = createSelector(
    (state: { employees: typeEmployee[] }) => state.employees,
    (_:{ employees: typeEmployee[] }, arg?:{companyIds:Set<string>, count?:number, lastId?: string}) => arg,
    (employees:typeEmployee[], arg?:{companyIds:Set<string>, count?:number, lastId?: string}) => {
        if(arg) {
            const newEmployees = employees.filter((employee) => arg.companyIds.has(employee.companyId));
            if (arg.count) {
                if (arg.lastId) {
                    const indexLastEmployee = newEmployees.findIndex(employee => employee.id === arg.lastId) + 1;
                    if (indexLastEmployee !== -1 && newEmployees.length !== indexLastEmployee)
                        return newEmployees.slice(0, ((newEmployees.length - indexLastEmployee) > arg.count ? arg.count : (newEmployees.length - indexLastEmployee)) + indexLastEmployee);
                    else if(indexLastEmployee !== -1) return newEmployees;
                    else return [];
                } else
                    return newEmployees.slice(0, arg.count);
            }
            return newEmployees;
        }
        return [];
    },
)

export const selectAllEmployees = (state: { employees: typeEmployee[] }) =>state;

export const {employeeAdded, employeeDelete, employeeUpdate} = employeeSlice.actions;

export default employeeSlice.reducer;