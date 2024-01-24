export type Movement = {
    name: string,
    max: number,
}

export type Set = {
    reps: number,
    amrap: boolean,
    percent: number,
}

export type Workout = {
    date: Date,
    movement: Movement,
    sets: Set[],
}