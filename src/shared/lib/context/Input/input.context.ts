import { createContext, useContext } from 'react';

export type inputContextProps = {
    onInputUpdate:(id: string, value: string)=>void
};

export const InputContext = createContext<inputContextProps | null>(null);
InputContext.displayName = 'InputContext';

export function useInputContext() {
    const ctx = useContext(InputContext);

    if (!ctx) {
        throw new Error('useInputContext must be used within a <InputText />');
    }

    return ctx;
}