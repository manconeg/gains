export type Movement = {
    name: string,
    max: number,
    sets: Set[],
}

export type Set = {
    reps: number,
    amrap: boolean,
    percent: number,
    complete: boolean,
}

export type Workout = {
    date: Date,
    movements: Movement[],
    complete: boolean,
}