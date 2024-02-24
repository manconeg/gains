import { getData } from '@/LoadCSV';
import { Workout } from '@/models';
import { ChronoUnit, LocalDate } from '@js-joda/core';
import * as Crypto from 'expo-crypto';
import { produce } from 'immer';
import { Dispatch, createContext, useContext, useEffect, useReducer } from 'react';
import * as FileSystem from 'expo-file-system'

const WorkoutsContext = createContext<Workout[]>([]);
const WorkoutsDispatchContext = createContext<Dispatch<WorkoutsAction>>(null);

function uuidv4() {
    return Crypto.randomUUID()
}

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

    initialLoad(dispatch)

    return (
        <WorkoutsContext.Provider value={workouts}>
            <WorkoutsDispatchContext.Provider value={dispatch}>
                {children}
            </WorkoutsDispatchContext.Provider>
        </WorkoutsContext.Provider>
    );
}

export enum WorkoutsActions {
    ADD_REPS,
    ADD_WORKOUT,
    ADD_WORKOUTS,
    LOAD_WORKOUTS,
}

type WorkoutsAction = AddRepsAction | AddWorkoutAction | AddWorkoutsAction | LoadWorkoutsAction

type LoadWorkoutsAction = {
    type: WorkoutsActions.LOAD_WORKOUTS,
    workouts: Workout[],
}

type AddWorkoutAction = {
    type: WorkoutsActions.ADD_WORKOUT,
    workout: Workout,
}

type AddWorkoutsAction = {
    type: WorkoutsActions.ADD_WORKOUTS,
    workouts: Workout[],
}

type AddRepsAction = {
    type: WorkoutsActions.ADD_REPS,
    workoutId: string,
    movementId: string,
    setGroupId: string,
    setId: string,
    repsPerformed: number,
    weightPerformed: number,
    complete: boolean,
}

let loaded = false

function initialLoad(dispatch: Dispatch<WorkoutsAction>) {
    if (!loaded) {
        console.log('Loading')
        loaded = true
        loadWorkouts().then(workoutsString => {
            dispatch({
                type: WorkoutsActions.LOAD_WORKOUTS,
                workouts: JSON.parse(workoutsString, function (key, value) {
                    if (typeof value === 'string') {
                        try {
                            let data = LocalDate.parse(value)
                            return data
                        } catch(err) {}
                    }
                    return value;
                }),
            })
        }).catch(error => {
            console.error(error)
        })
        // getData().then(workouts => {
        //     dispatch({
        //         type: WorkoutsActions.ADD_WORKOUTS,
        //         workouts: workouts,
        //     })
        // })
    }
}

function workoutsReducer(workouts: Workout[], action: WorkoutsAction) {
    const newWorkouts = (() => {
         switch (action.type) {
        case WorkoutsActions.ADD_REPS: {
            return produce(workouts, draft => {
                let set = draft.find(workout => workout.id === action.workoutId)
                    ?.movements.find(movement => movement.id === action.movementId)
                    ?.setGroups.find(setGroup => setGroup.id === action.setGroupId)
                    ?.sets.find(set => set.id === action.setId)

                if (set) {
                    set.repsPerformed = action.repsPerformed
                    set.weightPerformed = action.weightPerformed
                    set.complete = action.complete
                }
            })
        }
        case WorkoutsActions.ADD_WORKOUT: {
            return [...workouts, action.workout]
        }
        case WorkoutsActions.ADD_WORKOUTS: {
            return [...workouts, ...action.workouts]
        }
        case WorkoutsActions.LOAD_WORKOUTS: {
            return [...action.workouts]
        }
    }})()

    persistWorkouts(newWorkouts)

    return newWorkouts
}

function persistWorkouts(workouts: Workout[]) {
    const uri = `${FileSystem.documentDirectory}save.json`
    console.log(uri)
    FileSystem.writeAsStringAsync(uri, JSON.stringify(workouts))
}

function loadWorkouts() {
    const uri = `${FileSystem.documentDirectory}save.json`
    console.log(`loading ${uri}`)
    return FileSystem.readAsStringAsync(uri)
}

const initialWorkouts: Workout[] = [
    {
        id: uuidv4(),
        date: LocalDate.now(),
        program: '531',
        variation: 'Classic',
        day: '1s',
        complete: false,
        movements: [
            {
                id: uuidv4(),
                name: "BENCH",
                max: 240,
                complete: false,
                setGroups: [
                    {
                        id: uuidv4(),
                        name: "Working",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 3,
                                amrap: false,
                                percent: .85,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 1,
                                amrap: true,
                                percent: .95,
                                complete: false,
                            },
                        ],
                    },
                    {
                        id: uuidv4(),
                        name: "Boring but Big",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
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
        id: uuidv4(),
        date: LocalDate.now().minusMonths(1),
        program: '531',
        variation: 'Classic',
        day: '1s',
        complete: true,
        movements: [
            {
                id: uuidv4(),
                name: "BENCH",
                max: 240,
                complete: true,
                setGroups: [
                    {
                        id: uuidv4(),
                        name: "Working",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                id: uuidv4(),
                                reps: 3,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                id: uuidv4(),
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
                        id: uuidv4(),
                        name: "Boring but Big",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
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
        id: uuidv4(),
        date: LocalDate.now().minusMonths(2),
        program: '531',
        variation: 'Classic',
        day: '1s',
        complete: true,
        movements: [
            {
                id: uuidv4(),
                name: "BENCH",
                max: 240,
                complete: true,
                setGroups: [
                    {
                        id: uuidv4(),
                        name: "Working",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                id: uuidv4(),
                                reps: 3,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                id: uuidv4(),
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
                        id: uuidv4(),
                        name: "Boring but Big",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
                                reps: 10,
                                amrap: false,
                                percent: .5,
                                complete: false,
                            }, {
                                id: uuidv4(),
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
        id: uuidv4(),
        date: LocalDate.now().minus(2, ChronoUnit.DAYS),
        program: '531',
        complete: true,
        variation: 'Classic',
        day: '5s',
        movements: [
            {
                id: uuidv4(),
                name: "DEADLIFT",
                max: 400,
                complete: true,
                setGroups: [
                    {
                        id: uuidv4(),
                        name: "Working",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                id: uuidv4(),
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
        id: uuidv4(),
        date: LocalDate.now().plus(2, ChronoUnit.DAYS),
        program: '5x5',
        complete: true,
        variation: 'Classic',
        day: 'Workout A',
        movements: [
            {
                id: uuidv4(),
                name: "DEADLIFT",
                max: 400,
                complete: true,
                setGroups: [
                    {
                        id: uuidv4(),
                        name: "Working",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                id: uuidv4(),
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
                id: uuidv4(),
                name: "Bench",
                max: 200,
                complete: true,
                setGroups: [
                    {
                        id: uuidv4(),
                        name: "Working",
                        sets: [
                            {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .75,
                                complete: true,
                            }, {
                                id: uuidv4(),
                                reps: 5,
                                amrap: false,
                                percent: .85,
                                complete: true,
                            }, {
                                id: uuidv4(),
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