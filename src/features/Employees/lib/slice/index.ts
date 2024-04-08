import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {employeesMock} from "../../../../shared/lib/server";
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

export const selectAllEmployees = (state: { employees: typeEmployee[] }) => state.employees;

export const {employeeAdded, employeeUpdate} = employeeSlice.actions;

export default employeeSlice.reducer;