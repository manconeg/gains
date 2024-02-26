import { Workout } from "@/models"

export interface IWorkouts {
    getWorkouts(): Promise<Workout[]>
    saveWorkouts(workouts: Workout[]): void
}