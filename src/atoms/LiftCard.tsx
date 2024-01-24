import { View, Text, Image } from 'react-native'
import { Workout } from '@/data/types'

type LiftCardParams = {
    workout: Workout,
}

function oneRepMax(weight: number, reps: number)
{
    // https://www.athlegan.com/calculate-1rm
    return weight * (36 / (37 - reps))
}

export function LiftCard(params: LiftCardParams) {
    let topSet = params.workout.sets.sort((a, b) => (oneRepMax(a.percent, a.reps) - oneRepMax(b.percent, b.reps)))[params.workout.sets.length - 1];

    return (
        <View>
            <Image></Image>
            <Text>{params.workout.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</Text>
            <Text>{params.workout.movement.name}</Text>
            <Text>Top set: {topSet.percent * params.workout.movement.max} x {topSet.reps}{topSet.amrap ? '+' : ''}</Text>
            <Text>Complete</Text>
        </View>
        )
  }