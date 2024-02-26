import { Context, initializeContex } from "./Context"

export enum DyanmicFABStatus {
    HIDDEN, VISIBLE,
}

export enum DynamiccFABActions {
    CHANGE_TEXT,
}

type DynamicFABContext = Context & {
    state: DyanmicFABStatus,
    text: string,
    icon: 'plus' | 'check',
}

const initialContext: DynamicFABContext = {
    state: DyanmicFABStatus.VISIBLE,
    text: 'Add Workout',
    icon: 'plus',
}

type CHANGE_TEXT = {
    type: DynamiccFABActions.CHANGE_TEXT,
    text: string
}

type DynamicFABAction = CHANGE_TEXT


export const [useDynamicFABContext, useDynamicFABDispatchContext, DynamicFABProvideer] = initializeContex<DynamicFABContext, DynamicFABAction>(initialContext, (context: DynamicFABContext, action: DynamicFABAction): DynamicFABContext => {
    switch (action.type) {
        case DynamiccFABActions.CHANGE_TEXT:
            return context
    }
    return context
})