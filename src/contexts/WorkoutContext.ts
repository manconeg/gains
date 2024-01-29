import { Workout } from '@/models';
import { ChronoUnit, Instant, ZoneId, LocalDate } from '@js-joda/core';
import { createContext } from 'react';

export const workouts: Workout[] = [
    {
        date: LocalDate.now(),//Instant.now().atZone(ZoneId.SYSTEM),
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

export const WorkoutContext = createContext<Workout[]>(null);