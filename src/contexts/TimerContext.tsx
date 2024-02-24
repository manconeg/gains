import { Set } from '@/models/Workout';
import { Dispatch, createContext, useContext, useReducer } from 'react';

export enum SetStatus {
    TIMING, RECORDING, NONE, RESTING,
}

type TimerContext = {
    onTimerComplete?: () => void,
    onRecordResult?: (reps: number, seconds: number) => void,
    state: SetStatus,
    initialReps?: number,
}

const initialTimerContext: TimerContext = {
    onTimerComplete: () => {},
    onRecordResult: () => {},
    state: SetStatus.NONE,
    initialReps: 0,
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
    STOP_TIMER,
    RECORD_REPS,
}

type TimerAction = StartTimer | StopTimer | RecordReps

type StartTimer = {
    type: TimerActions.START_TIMER,
    onTimerComplete: () => void,
}

type StopTimer = {
    type: TimerActions.STOP_TIMER,
}

type RecordReps = {
    type: TimerActions.RECORD_REPS,
    initialReps: number,
    onComplete: (reps: number, seconds: number) => void,
}

function timerReducer(timerContext: TimerContext, action: TimerAction): TimerContext {
    switch (action.type) {
        case TimerActions.START_TIMER: {
            return {
                state: SetStatus.TIMING,
                onTimerComplete: action.onTimerComplete,
            }
        }
        case TimerActions.RECORD_REPS: {
            return {
                state: SetStatus.RECORDING,
                onRecordResult: action.onComplete,
                initialReps: action.initialReps,
            }
        }
        case TimerActions.STOP_TIMER: {
            return {
                state: SetStatus.NONE
            }
        }
    }
}