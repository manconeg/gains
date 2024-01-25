export type Workout = {
    date: Date,
    variation: string,
    day: string,
    movements: Movement[],
    complete: boolean,
}

export type Movement = {
    name: string,
    max: number,
    complete: boolean,
    setGroups: SetGroup[],
}

export type SetGroup = {
    name: string,
    sets: Set[],
}

export type Set = {
    reps: number,
    amrap: boolean,
    percent: number,
    complete: boolean,
}
