import { Movement, Set } from "./models/Workout";

export function repMaxCalc(movement: Movement) {
    let allSets: Set[] = []
    movement.setGroups.forEach(setGroup => allSets = allSets.concat(setGroup.sets))
    return allSets.sort((a, b) => (oneRepMax(a.percent, a.reps) - oneRepMax(b.percent, b.reps)))[allSets.length - 1];
}

export function repPerformedMaxCalc(movement: Movement) {
    console.log('Calculating 1rm for movement')
    console.log(movement.setGroups[0])
    return movement.setGroups
        .flatMap(setGroup => setGroup.sets)
        .filter(set => set.repsPerformed != undefined)
        .filter(set => set.weightPerformed != undefined)
        .map(set => oneRepMax(set.weightPerformed, set.repsPerformed))
        .sort((a, b) => a - b)
        .pop() || 0;
}

function oneRepMax(weight: number, reps: number) {
    // https://www.athlegan.com/calculate-1rm
    return weight * (36 / (37 - reps))
}