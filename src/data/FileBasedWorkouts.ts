import { Workout } from "@/models";
import { LocalDate } from "@js-joda/core";
import * as FileSystem from 'expo-file-system';
import { IWorkouts } from "./IWorkouts";

export class FileBasedWorkouts implements IWorkouts {
    getWorkouts(): Promise<Workout[]> {
        console.log('Loading')

        const uri = `${FileSystem.documentDirectory}save.json`
        console.log(`loading ${uri}`)
        return FileSystem.readAsStringAsync(uri).then(workoutsString => {
            const parsedJson: Workout[] = JSON.parse(workoutsString, function (key, value) {
                if (typeof value === 'string') {
                    try {
                        let data = LocalDate.parse(value)
                        return data
                    } catch (err) { }
                }
                return value
            })
            return parsedJson
        })
    }
    saveWorkouts(workouts: Workout[]): void {
        const uri = `${FileSystem.documentDirectory}save.json`
        console.log(uri)
        FileSystem.writeAsStringAsync(uri, JSON.stringify(workouts))
    }
}