import {useSelector} from 'react-redux'
import {typeCompany} from "../../../../../shared/lib";
export const useCompaniesSelector = useSelector.withTypes<{ companies: typeCompany[] }>();
//export const useAppStore = useStore.withTypes<AppStore>()

