import { ProgramTemplate } from '@/models';
import { createContext } from 'react';

export const startingStrength: ProgramTemplate = {
    name: 'Starting Strength',
    type: 'fullWorkout',
    daysBetweenSameWorkout: 4,
    workoutStructure: [
        {
            name: 'Working',
            optional: false,
            variations: [
                {
                    name: "Original",
                    workouts: [
                        {
                            name: "a",
                            movements: [{
                                type: "squat",
                                sets: [{
                                    reps: 5,
                                    sets: 3,
                                    percent: 100,
                                }]
                            },
                            {
                                type: "bench",
                                sets: [{
                                    reps: 5,
                                    sets: 3,
                                    percent: 100,
                                }]
                            },
                            {
                                type: "deadlift",
                                sets: [{
                                    reps: 5,
                                    sets: 1,
                                    percent: 100,
                                }]
                            }]
                        },
                        {
                            name: "b",
                            movements: [
                                {
                                    type: "squat",
                                    sets: [{
                                        reps: 5,
                                        sets: 3,
                                        percent: 100,
                                    }]
                                },
                                {
                                    type: "ohp",
                                    sets: [{
                                        reps: 5,
                                        sets: 3,
                                        percent: 100,
                                    }]
                                },
                                {
                                    type: "powerclean",
                                    sets: [{
                                        reps: 3,
                                        sets: 5,
                                        percent: 100,
                                    }]
                                },
                            ]
                        }
                    ]
                },

            ]
        },
    ]
}

export const fiveThreeOne: ProgramTemplate = {
    name: 'Five/Three/One',
    type: 'perMovement',
    daysBetweenSameWorkout: 7,
    workoutStructure: [
        {
            name: 'Warmup',
            optional: true,
            variations: [
                {
                    name: "Typical",
                    workouts: [{
                        name: "",
                        movements: [{
                            type: "$primary",
                            sets: [
                                {
                                    sets: 1,
                                    reps: 5,
                                    percent: 40,
                                },
                                {
                                    sets: 1,
                                    reps: 5,
                                    percent: 50,
                                },
                                {
                                    sets: 1,
                                    reps: 3,
                                    percent: 60,
                                }
                            ],
                        }]
                    }]
                }]
        },
        {
            name: 'Assistance',
            optional: true,
            variations: []
        },
        {
            name: 'Supplimental',
            optional: true,
            variations: [
                {
                    name: "Boring But Big",
                    workouts: [{
                        name: "",
                        movements: [{
                            type: "$primary",
                            sets: [
                                {
                                    sets: 5,
                                    reps: 10,
                                    percent: 50,
                                }
                            ],
                        }]
                    }]
                }
            ]
        },
        {
            name: 'Working',
            variations: [
                {
                    name: 'classic',
                    workouts: [{
                        name: '5s',
                        movements: [{
                            type: "$primary",
                            sets: [
                                {
                                    sets: 1,
                                    reps: 5,
                                    percent: 65,
                                },
                                {
                                    sets: 1,
                                    reps: 5,
                                    percent: 70,
                                },
                                {
                                    sets: 1,
                                    reps: 5,
                                    percent: 75,
                                    amrap: true,
                                },
                            ]
                        }
                        ]
                    }, {
                        name: '3s',
                        movements: [{
                            type: "$primary",
                            sets: [{
                                reps: 3,
                                sets: 1,
                                percent: 65,
                            },
                            {
                                reps: 3,
                                sets: 1,
                                percent: 65,
                            },
                            {
                                reps: 3,
                                sets: 1,
                                percent: 65,
                                amrap: true,
                            },
                            ]
                        }]
                    },, {
                        name: '1s',
                        movements: [{
                            type: "$primary",
                            sets: [{
                                reps: 5,
                                sets: 1,
                                percent: 75,
                            },
                            {
                                reps: 3,
                                sets: 1,
                                percent: 85,
                            },
                            {
                                reps: 1,
                                sets: 1,
                                percent: 95,
                                amrap: true,
                            },
                            ]
                        }]
                    },]
                }
            ],
        },
    ]
}

const data = {
    workouts: {
        date: '',
        template: '',
        movement: 'deadlift',
        status: 'complete',
        sets: [
            {
                reps: 5,
                weight: 180,
            }
        ],
    },
    food: {

    },
    sleep: {

    },
}

export const ProgramTemplateContext = createContext<ProgramTemplate[]>(null);