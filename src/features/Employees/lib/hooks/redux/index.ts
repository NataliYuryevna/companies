import {useSelector} from 'react-redux'
import {typeEmployee} from "../../../../../shared/lib/server";
export const useEmployeesSelector = useSelector.withTypes<{ employees: typeEmployee[] }>()
//export const useAppStore = useStore.withTypes<AppStore>()

