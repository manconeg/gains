import { Workout, Movement } from "@/models";
import { Instant, LocalDate } from "@js-joda/core";
import { Graph } from "./Graph";
import { repPerformedMaxCalc } from "@/RepMaxCalc"
import { useState } from "react"

export type GraphParams = {
    workouts: Workout[],
    movement: Movement,
}

enum GraphType {
    MONTH,
    YEAR,
    ALL,
}

export function ProgressGraph({
    workouts,
    movement,
}: GraphParams) {
    const [graphType, setGraphType] = useState(GraphType.MONTH)
    let data: { date: LocalDate, value: number }[] = workouts
        .sort((workoutA, workoutB) => workoutA.date.toEpochDay() - workoutB.date.toEpochDay())
        .filter(workout => graphType === GraphType.ALL || workout.date.isAfter(LocalDate.now().minusMonths(graphType === GraphType.MONTH ? 1 : 12)))
        .flatMap<{ date: LocalDate, value: number }>(workout => {
            return workout.movements
                .filter(workoutMovement => movement && (workoutMovement.name == movement.name))
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
