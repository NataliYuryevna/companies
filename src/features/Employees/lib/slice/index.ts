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
        }
    }
})

export const selectAllEmployees = (state: { employees: typeEmployee[] }) => state.employees;

export const {employeeAdded} = employeeSlice.actions;

export default employeeSlice.reducer;