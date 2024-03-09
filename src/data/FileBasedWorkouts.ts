import { Workout } from "@/models";
import { LocalDate } from "@js-joda/core";
import * as FileSystem from 'expo-file-system';
import { IWorkouts } from "./IWorkouts";

export class FileBasedWorkouts implements IWorkouts {
    getWorkouts(): Promise<Workout[]> {
        const uri = `${FileSystem.documentDirectory}save.json`
        console.log(`loading ${uri}`)
        return new Promise((resolve, reject) => FileSystem.readAsStringAsync(uri).then(workoutsString => {
            const parsedJson: Workout[] = JSON.parse(workoutsString, function (key, value) {
                if (typeof value === 'string') {
                    try {
                        let data = LocalDate.parse(value)
                        return data
                    } catch (err) { }
                }
                return value
            })
            resolve(parsedJson)
        }).catch(() => reject([])))
    }
    saveWorkouts(workouts: Workout[]): void {
        const uri = `${FileSystem.documentDirectory}save.json`
        console.log('saving', uri)
        FileSystem.writeAsStringAsync(uri, JSON.stringify(workouts))
    }
}