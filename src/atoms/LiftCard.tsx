import { View, Text, Image } from 'react-native'

type Movement = {
    name: string,
    max: number,
}

type Set = {
    reps: number,
    amrap: boolean,
    percent: number,
}

type Workout = {
    date: Date,
    movement: Movement,
    sets: Set[],
}

type LiftCardParams = {
    workout: Workout,
}

function oneRepMax(weight: number, reps: number)
{
    return weight * (36 / (37 - reps))
}

export function LiftCard(params: LiftCardParams) {
    params = {
        workout: {
            date: new Date(2023, 2, 23),
            movement: {
                name: "Bench Press",
                max: 240 * .9,
            },
            sets: [
                {
                    reps: 5,
                    amrap: false,
                    percent: .75,
                }, {
                    reps: 3,
                    amrap: false,
                    percent: .85,
                }, {
                    reps: 1,
                    amrap: true,
                    percent: .95,
                }
            ]
        }
    }

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