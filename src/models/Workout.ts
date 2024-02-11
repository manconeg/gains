import { LocalDate } from "@js-joda/core"

export type Workout = {
    id: string,
    date: LocalDate,
    program: string,
    variation: string,
    day: string,
    movements: Movement[],
    complete: boolean,
}

export type Movement = {
    id: string,
    name: string,
    max: number,
    complete: boolean,
    setGroups: SetGroup[],
}

export type SetGroup = {
    id: string,
    name: string,
    sets: Set[],
}

export type Set = {
    id: string,
    reps: number,
    repsPerformed?: number,
    weightPerformed?: number,
    amrap: boolean,
    percent: number,
    complete: boolean,
}
