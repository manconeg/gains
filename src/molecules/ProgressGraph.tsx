import { Workout } from "@/models";
import { LocalDate } from "@js-joda/core";
import { Graph } from "./Graph";
import { repPerformedMaxCalc } from "@/RepMaxCalc"

export type GraphParams = {
    workouts: Workout[],
    movement: string | false,
}

export function ProgressGraph({
    workouts,
    movement
}: GraphParams) {
    console.log(movement)
    let data: { date: LocalDate, value: number }[] = workouts
        .sort((workoutA, workoutB) => workoutA.date.toEpochDay() - workoutB.date.toEpochDay())
        .flatMap<{ date: LocalDate, value: number }>(workout => {
            return workout.movements
                .filter(workoutMovement => movement && (workoutMovement.name == movement))
                .map(workoutMovement => {
                    return {
                        date: workout.date,
                        value: repPerformedMaxCalc(workoutMovement),
                    }
                })
        })
        console.log(data)
    return (
        <Graph data={data} />
    )
}
