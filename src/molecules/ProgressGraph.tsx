import { repPerformedMaxCalc } from "@/RepMaxCalc";
import { Movement, Workout } from "@/models";
import { LocalDate } from "@js-joda/core";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
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

let calculateData = (graphType: GraphType, workouts: Workout[], movement: Movement | undefined): Map<String, GraphData> => {
    var startDate: LocalDate
    switch (graphType) {
        case GraphType.MONTH: startDate = LocalDate.now().minusMonths(1); break;
        case GraphType.THREE_MONTH: startDate = LocalDate.now().minusMonths(3); break;
        case GraphType.YEAR: startDate = LocalDate.now().minusMonths(12); break;
        case GraphType.ALL: startDate = LocalDate.EPOCH_0
        // default: throw "Invalid  start date"
    }

    var data: Map<String, GraphData> = new Map()
    workouts
        .filter(workout => workout.date.isAfter(startDate))
        .sort((workoutA, workoutB) => workoutA.date.toEpochDay() - workoutB.date.toEpochDay())
        .forEach(workout => {
            return workout.movements
                .filter(workoutMovement => !movement || workoutMovement.name == movement.name)
                .filter(workoutMovement => workoutMovement.complete)
                .forEach(workoutMovement => {
                    if (!data.has(workoutMovement.name)) data.set(workoutMovement.name, [])
                    data.get(workoutMovement.name)!.push({
                        date: workout.date,
                        value: repPerformedMaxCalc(workoutMovement),
                    })
                })
        })
    return data
}

export function ProgressGraph({
    workouts,
    movement,
}: GraphParams) {
    const [graphType, setGraphType] = useState(GraphType.MONTH)
    const [data, setData] = useState(new Map())

    useEffect(() => {
        // const start = Date.now();
        setData(calculateData(graphType, workouts, movement))
        // const end = Date.now();
        // console.log(`Filtering: ${end - start} ms`);   
    }, [graphType, workouts])

    const dataSets: { data: GraphData, color: string }[] = useMemo(() => {
        // const start = Date.now();
        let sets = Array.from(data.keys()).map(key => {
            return { data: data.get(key)!, color: 'blue', }
        });
        // const end = Date.now();
        // console.log(`Coloring: ${end - start} ms`);
        return sets
    }, [data])

    return (
        <View>
            {dataSets.length ? <>
                <Graph dataSets={dataSets} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>
                    <Button disabled={graphType == GraphType.MONTH} onPress={() => {console.log("push");setGraphType(GraphType.MONTH)}}>Month</Button>
                    <Button disabled={graphType == GraphType.THREE_MONTH} onPress={() => setGraphType(GraphType.THREE_MONTH)}>3 Months</Button>
                    <Button disabled={graphType == GraphType.YEAR} onPress={() => setGraphType(GraphType.YEAR)}>Year</Button>
                    <Button disabled={graphType == GraphType.ALL} onPress={() => setGraphType(GraphType.ALL)}>All</Button>
                </View>
            </> : <Text>No data</Text>}
        </View>
    )
}
