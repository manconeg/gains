import { Context, initializeContex } from "./Context"
import { useFocusEffect } from "expo-router";

export enum DynamicFABActions {
    CHANGE_TEXT,
    CHANGE_PROPS,
}

type DynamicFABContext = Context & {
    visible: boolean,
    label: string,
    icon: 'plus' | 'check',
    onPress: () => void,
}

const initialContext: DynamicFABContext = {
    visible: true,
    label: 'Add Workout',
    icon: 'plus',
    onPress: () => {},
}

type CHANGE_TEXT = {
    type: DynamicFABActions.CHANGE_TEXT,
    label: string,
}

type CHANGE_PROPS = {
    type: DynamicFABActions.CHANGE_PROPS,
    props: DynamicFABContext,
}

type DynamicFABAction = CHANGE_TEXT | CHANGE_PROPS

export const [useDynamicFABContext, useDynamicFABDispatchContext, DynamicFABProvider] = initializeContex<DynamicFABContext, DynamicFABAction>(initialContext, (context: DynamicFABContext, action: DynamicFABAction): DynamicFABContext => {
    switch (action.type) {
        case DynamicFABActions.CHANGE_TEXT:
            return {...context, "label": action.label}
        case DynamicFABActions.CHANGE_PROPS:
            return action.props
    }
})

export function FloatingAction(props: DynamicFABContext) {
    const dispatch = useDynamicFABDispatchContext()
    useFocusEffect(() => {    
        dispatch({type: DynamicFABActions.CHANGE_PROPS, props: props})
    })
    return <></>
}