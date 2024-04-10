import {configureStore} from "@reduxjs/toolkit";
import {companiesReducer} from "./Companies/lib"
import {employeesReducer} from "./Employees/lib"
import {useDispatch} from "react-redux";
//import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        companies: companiesReducer,
        employees: employeesReducer
    },
    /*middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(logger)*/
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()