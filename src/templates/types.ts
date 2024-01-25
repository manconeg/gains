type WSet = {
    reps: number,
    sets: number,
    amrap?: true | false | undefined,
    percent: number,
}

type Variation = {
    workouts: Workout[],
    name: string,
}

type WorkoutStructure = {
    name: string,
    variations: Variation[],
    optional?: boolean,
}

type Movement = {
    type: string,
    sets: WSet[],
}

type Workout = {
    name: string,
    movements: Movement[],
}

type ProgramTemplate = {
    name: string,
    type: "fullWorkout" | "perMovement",
    workoutStructure: WorkoutStructure[],
    daysBetweenSameWorkout: number,
}

const startingStrength: ProgramTemplate = {
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

const fiveThreeOne: ProgramTemplate = {
    name: 'Five/Three/One',
    type: 'perMovement',
    daysBetweenSameWorkout: 7,
    workoutStructure: [
        {
            name: 'Warmup',
            optional: true,
            variations: []
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

export { fiveThreeOne }
