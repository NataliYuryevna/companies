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
        },
        companyDelete(state, action: PayloadAction<{ids:Array<string>}>) {
            return state.filter(el=>!action.payload.ids?.includes(el.id));
        },
        companyUpdate: {
            reducer(state, action: PayloadAction<{id:string, name: keyof typeCompany, value: string|number}>) {
                if(action.payload.name === 'count')
                    return state.map(el=>el.id === action.payload.id ? {...el, [action.payload.name]: (+el[action.payload.name] + Number(action.payload.value))} : el);
                return state.map(el=>el.id === action.payload.id ? {...el, [action.payload.name]:action.payload.value } : el);
            },
            prepare(id:string, name: keyof typeCompany, value: string|number) {
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

export const selectAllCompanies = (state: { companies: typeCompany[] }) => state.companies;

export const {companyAdded, companyDelete, companyUpdate} = companySlice.actions;

export default companySlice.reducer