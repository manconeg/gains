import { repPerformedMaxCalc } from "@/RepMaxCalc";
import { Movement, Workout } from "@/models";
import { LocalDate } from "@js-joda/core";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { Graph } from "./Graph";

export type GraphParams = {
    workouts: Workout[],
    movement?: Movement,
}

type GraphData = { date: LocalDate, value: number }[]

enum GraphType {
    MONTH,
    YEAR,
    THREE_MONTH,
    ALL,
}

let calculateData = (graphType: GraphType, workouts: Workout[], movement: Movement | undefined): GraphData => {
    var startDate: LocalDate
    switch(graphType) {
        case GraphType.MONTH: startDate = LocalDate.now().minusMonths(1)
        case GraphType.THREE_MONTH: startDate = LocalDate.now().minusMonths(3)
        case GraphType.YEAR: startDate = LocalDate.now().minusMonths(12)
        case GraphType.ALL: startDate = LocalDate.EPOCH_0
        // default: throw "Invalid  start date"
    }

    var data = workouts
        .sort((workoutA, workoutB) => workoutA.date.toEpochDay() - workoutB.date.toEpochDay())
        .filter(workout => graphType === GraphType.ALL || workout.date.isAfter(startDate))
        .flatMap<{ date: LocalDate, value: number }>(workout => {
            return workout.movements
                // .filter(workoutMovement => console.log(workoutMovement.name + " " + movement))
                .filter(workoutMovement => !movement || workoutMovement.name == movement.name)
                .map(workoutMovement => {
                    return {
                        date: workout.date,
                        value: repPerformedMaxCalc(workoutMovement),
                    }
                })
        })
    console.log(data)
    return data
}

export function ProgressGraph({
    workouts,
    movement,
}: GraphParams) {
    const [graphType, setGraphType] = useState(GraphType.YEAR)
    const [data, setData] = useState(calculateData(graphType, workouts, movement))

    useEffect(() => {
        console.log(graphType)
        setData(calculateData(graphType, workouts, movement))
    }, [graphType, workouts])

    return (
        <View>
            <Graph dataSets={[{data, color: 'blue',}]} />
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly',}}>
                <Button disabled={graphType == GraphType.YEAR} onPress={() => setGraphType(GraphType.YEAR)}>Year</Button>
                <Button disabled={graphType == GraphType.MONTH} onPress={() => setGraphType(GraphType.MONTH)}>Month</Button>
                <Button disabled={graphType == GraphType.THREE_MONTH} onPress={() => setGraphType(GraphType.THREE_MONTH)}>3 Months</Button>
                <Button disabled={graphType == GraphType.ALL} onPress={() => setGraphType(GraphType.ALL)}>All</Button>
            </View>
        </View>
    )
}
