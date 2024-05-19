import { ReactNode, useMemo } from 'react';
import { InputContext, inputContextProps } from './input.context';

type TabsProviderProps = inputContextProps & {
    children: ReactNode;
};

export function InputProvider(props: TabsProviderProps) {
    const { onInputUpdate, children } = props;

    const memoizedValue = useMemo(
        () => ({ onInputUpdate }),
        [onInputUpdate],
    );

    return (
        <InputContext.Provider value={memoizedValue}>
            {children}
        </InputContext.Provider>
    );
}