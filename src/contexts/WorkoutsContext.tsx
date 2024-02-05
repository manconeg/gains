import { Workout } from '@/models';
import { ChronoUnit, LocalDate } from '@js-joda/core';
import { createContext, useContext, useReducer, Dispatch } from 'react';

const WorkoutsContext = createContext<Workout[]>([]);
const WorkoutsDispatchContext = createContext<Dispatch<WorkoutsAction>>(null);

export function useWorkouts() {
    return useContext(WorkoutsContext);
}

export function useWorkoutsDispatch() {
    return useContext(WorkoutsDispatchContext);
}

export function WorkoutsProvider({ children }: { children: React.ReactNode }) {
    const [workouts, dispatch] = useReducer(
        workoutsReducer,
        initialWorkouts,
    );

    return (
        <WorkoutsContext.Provider value={workouts}>
            <WorkoutsDispatchContext.Provider value={dispatch}>
                {children}
            </WorkoutsDispatchContext.Provider>
        </WorkoutsContext.Provider>
    );
}

export enum WorkoutsActions {
    ADD_REPS
}

type WorkoutsAction = {
    type: WorkoutsActions.ADD_REPS,
    workoutId: number,
    movementId: number,
    setGroupId: number,
    setId: number,
    repsPerformed: number,
    weightPerformed: number,
}

function workoutsReducer(workouts: Workout[], action: WorkoutsAction) {
    switch (action.type) {
        case WorkoutsActions.ADD_REPS: {
            const set = {
                ...workouts[action.workoutId].movements[action.movementId].setGroups[action.setGroupId].sets[action.setId],
                repsPerformed: action.repsPerformed,
                weightPerformed: action.weightPerformed,
            }
            workouts[action.workoutId].movements[action.movementId].setGroups[action.setGroupId].sets[action.setId] = set
            return [...workouts]
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const initialWorkouts: Workout[] = [
    {
        date: LocalDate.now(),
        program: '531',
        variation: 'Classic',
        day: '1s',
        complete: false,
        movements: [
            {
                name: "Bench Press",
                max: 240,
                complete: false,
                setGroups: [
                    {
                        name: "Working",
                        sets: [
                            {
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: false,
                            }, {
                                reps: 3,
                                amrap: false,
                                percent: .85,
                                complete: false,
                            }, {
                                reps: 1,
                                amrap: true,
                                percent: .95,
                                complete: false,
                            },
                        ],
                    },
                    {
                        name: "Boring but Big",
                        sets: [
                            {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            },
                        ],
                    },
                ],
            },
        ],
    }, {
        date: LocalDate.now().minusMonths(1),
        program: '531',
        variation: 'Classic',
        day: '1s',
        complete: true,
        movements: [
            {
                name: "Bench Press",
                max: 240,
                complete: true,
                setGroups: [
                    {
                        name: "Working",
                        sets: [
                            {
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                reps: 3,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                reps: 1,
                                amrap: true,
                                percent: .95,
                                complete: true,
                                repsPerformed: 5,
                                weightPerformed: 190,
                            },
                        ],
                    },
                    {
                        name: "Boring but Big",
                        sets: [
                            {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            },
                        ],
                    },
                ],
            },
        ],
    }, {
        date: LocalDate.now().minusMonths(2),
        program: '531',
        variation: 'Classic',
        day: '1s',
        complete: true,
        movements: [
            {
                name: "Bench Press",
                max: 240,
                complete: true,
                setGroups: [
                    {
                        name: "Working",
                        sets: [
                            {
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                reps: 3,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                reps: 1,
                                amrap: true,
                                percent: .95,
                                complete: true,
                                repsPerformed: 8,
                                weightPerformed: 200,
                            },
                        ],
                    },
                    {
                        name: "Boring but Big",
                        sets: [
                            {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            },
                        ],
                    },
                ],
            },
        ],
    }, {
        date: LocalDate.now().minus(2, ChronoUnit.DAYS),
        program: '531',
        complete: true,
        variation: 'Classic',
        day: '5s',
        movements: [
            {
                name: "Deadlift",
                max: 400,
                complete: true,
                setGroups: [
                    {
                        name: "Working",
                        sets: [
                            {
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                reps: 5,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                reps: 5,
                                amrap: true,
                                percent: .95,
                                complete: true,
                            },
                        ],
                    },
                ],
            },
        ],
    }, {
        date: LocalDate.now().plus(2, ChronoUnit.DAYS),
        program: '5x5',
        complete: true,
        variation: 'Classic',
        day: 'Workout A',
        movements: [
            {
                name: "Deadlift",
                max: 400,
                complete: true,
                setGroups: [
                    {
                        name: "Working",
                        sets: [
                            {
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                reps: 5,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                reps: 5,
                                amrap: true,
                                percent: .95,
                                complete: true,
                            }
                        ],
                    },
                ],
            },
            {
                name: "Bench",
                max: 200,
                complete: true,
                setGroups: [
                    {
                        name: "Working",
                        sets: [
                            {
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                reps: 5,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                reps: 5,
                                amrap: true,
                                percent: .95,
                                complete: true,
                            }
                        ],
                    },
                ],
            },
        ],
    },
]