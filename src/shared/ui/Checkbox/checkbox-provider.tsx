import { ReactNode, useMemo } from 'react';
import { CheckboxContext, checkboxContextProps } from './checkbox.context';

type TabsProviderProps = checkboxContextProps & {
    children: ReactNode;
};

export function CheckboxProvider(props: TabsProviderProps) {
    const { activeCheckboxes, onCheckboxAdd, onCheckboxDelete, children } = props;

    const memoizedValue = useMemo(
        () => ({ activeCheckboxes, onCheckboxAdd, onCheckboxDelete }),
        [activeCheckboxes, onCheckboxAdd, onCheckboxDelete],
    );

    return (
        <CheckboxContext.Provider value={memoizedValue}>
            {children}
        </CheckboxContext.Provider>
    );
}