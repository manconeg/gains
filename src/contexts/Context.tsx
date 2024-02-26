import { Dispatch, ReactNode, Reducer, createContext, useContext, useReducer } from 'react';

export type Context = {}

export function initializeContex<C, A>(initialContext: C, reducer: Reducer<any, any>): [() => C, () => Dispatch<A>, React.FunctionComponent<{ children: ReactNode[] }>] {

    const Context = createContext<C>(initialContext);
    const DispatchContext = createContext<Dispatch<A>>(null);

    return [
        () => useContext(Context),
        () => useContext(DispatchContext),
        ({ children }) => {
            const [state, dispatch] = useReducer(
                reducer,
                initialContext,
            );

            return (
                <Context.Provider value={state}>
                    <DispatchContext.Provider value={dispatch}>
                        {children}
                    </DispatchContext.Provider>
                </Context.Provider>
            );
        }
    ]
}