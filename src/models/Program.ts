
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

export type ProgramTemplate = {
    name: string,
    type: "fullWorkout" | "perMovement",
    workoutStructure: WorkoutStructure[],
    daysBetweenSameWorkout: number,
}