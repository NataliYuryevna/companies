import { createContext, useContext } from 'react';

export type checkboxContextProps = {
    activeCheckboxes: Set<string>
    onCheckboxAdd:(id:string)=>void,
    onCheckboxDelete:(id:string)=>void,
};

export const CheckboxContext = createContext<checkboxContextProps | null>(null);
CheckboxContext.displayName = 'CheckboxContext';

export function useCheckboxContext() {
    const ctx = useContext(CheckboxContext);

    if (!ctx) {
        throw new Error('useCheckboxContext must be used within a <Checkbox />');
    }

    return ctx;
}