import { Workout } from '@/data/types';
import { createContext } from 'react';
import { Instant, ChronoUnit } from '@js-joda/core';

export const workouts: Workout[] = [
    {
        date: Instant.now(),
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
                ],
            },
        ],
    }, {
        date: Instant.now().minus(2, ChronoUnit.DAYS),
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
        date: Instant.now().plus(2, ChronoUnit.DAYS),
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

export const WorkoutContext = createContext<Workout[]>(null);