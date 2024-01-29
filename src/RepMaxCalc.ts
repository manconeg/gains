import { Movement, Set } from "./models/Workout";

export default function repMaxCalc(movement: Movement) {
    let allSets: Set[] = []
    movement.setGroups.forEach(setGroup => allSets = allSets.concat(setGroup.sets))
    return allSets.sort((a, b) => (oneRepMax(a.percent, a.reps) - oneRepMax(b.percent, b.reps)))[allSets.length - 1];
}

function oneRepMax(weight: number, reps: number) {
    // https://www.athlegan.com/calculate-1rm
    return weight * (36 / (37 - reps))
}