import {createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import {companiesMock} from "../../../../shared/lib/server";
import type {typeCompany} from "../../../../shared/lib/server";

const companySlice = createSlice({
    name: 'company',
    initialState: companiesMock,
    reducers: {
        companyAdded: {
            reducer(state, action: PayloadAction<typeCompany>) {
                state.push(action.payload)
            },
            prepare(name:string, address:string) {
                return {
                    payload: {
                        id: nanoid(),
                        name,
                        count: 0,
                        address
                    }
                }
            }
        }
    }
})

export const selectAllCompanies = (state: { companies: typeCompany[] }) => state.companies;

export const {companyAdded} = companySlice.actions;

export default companySlice.reducer