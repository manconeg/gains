import { LocalDate } from '@js-joda/core'
import { randomUUID } from 'expo-crypto'
import * as FileSystem from 'expo-file-system'
import { StorageAccessFramework } from 'expo-file-system'
import Papa from 'papaparse'
import { Workout } from './models'

const workouts: Map<LocalDate, Workout> = new Map()

export async function getData(): Promise<Workout[]> {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (permissions.granted) {
        // Gets SAF URI from response
        const uri = permissions.directoryUri;

        // Gets all files inside of selected directory
        const files = await StorageAccessFramework.readDirectoryAsync(uri);
        let rawFile = files[1]
        let contents = await FileSystem.readAsStringAsync(rawFile)
        let data = Papa.parse(contents, { header: true })

        data.data.forEach(line => {
            const rawDate = line.logDate.split('T')[0]
            const date = LocalDate.parse(rawDate)
            if (!workouts.has(date)) workouts.set(date, {
                id: randomUUID(),
                date: date,
                program: '531',
                day: line.week,
                movements: [],
                complete: true,
                variation: 'standard',
            })
            const workout = workouts.get(date)
            if (!workout?.movements.find(movement => movement.name.toUpperCase() == line.exerciseName)) {
                workout?.movements.push({
                    name: line.exerciseName,
                    setGroups: [],
                    complete: true,
                    id: randomUUID(),
                    max: line.weight,
                })
            }
            const movement = workout?.movements.find(movement => movement.name.toUpperCase() == line.exerciseName)
            if (!movement?.setGroups.length) {
                const percent = line.week == 1 ? .85 : line.week == 2 ? .90 : .95
                movement.setGroups = [
                    {
                        name: "Working",
                        id: randomUUID(),
                        sets: [{
                            id: randomUUID(),
                            reps: line.week == 1 ? 5 : line.week == 2 ? 3 : 1,
                            amrap: true,
                            repsPerformed: line.lastSetReps,
                            weightPerformed: line.weight * (line.tmPercentage / 100) * percent,
                            percent: percent,
                            complete: true,
                        }]
                    }
                ]
            }
        })
        console.log("done")
        return Array.from(workouts.values())
    }
    return []
}