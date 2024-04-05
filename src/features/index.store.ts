import {configureStore} from "@reduxjs/toolkit";
import {companiesReducer} from "./Companies/lib"
import {employeesReducer} from "./Employees/lib"
import {useDispatch} from "react-redux";

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
        employees: employeesReducer
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()