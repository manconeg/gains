import { Set } from '@/models/Workout';
import { Dispatch, createContext, useContext, useReducer } from 'react';

type TimerContext = {
    onComplete: (reps: number) => void,
    active: boolean,
    set?: Set,
}

const initialTimerContext: TimerContext = {
    onComplete: (reps: number) => { },
    active: false,
    set: undefined,
}

const TimerContext = createContext<TimerContext>(initialTimerContext);
const TimerDispatchContext = createContext<Dispatch<TimerAction>>(null);

export function useTimer() {
    return useContext(TimerContext);
}

export function useTimerDispatch() {
    return useContext(TimerDispatchContext);
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [timer, dispatch] = useReducer(
        timerReducer,
        initialTimerContext,
    );

    return (
        <TimerContext.Provider value={timer}>
            <TimerDispatchContext.Provider value={dispatch}>
                {children}
            </TimerDispatchContext.Provider>
        </TimerContext.Provider>
    );
}

export enum TimerActions {
    START_TIMER,
    STOP_TIMER
}

type TimerAction = | StartTimer | StopTimer
type StartTimer = {
    type: TimerActions.START_TIMER,
} & TimerContext
type StopTimer = {
    type: TimerActions.STOP_TIMER,
}

function timerReducer(timerContext: TimerContext, action: TimerAction): TimerContext {
    switch (action.type) {
        case TimerActions.START_TIMER: {
            return action
        }
        case TimerActions.STOP_TIMER: {
            return {
                active: false,
                onComplete: () => { },
                set: undefined,
            }
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}