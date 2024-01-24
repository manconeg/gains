import { StyleSheet, View, Text, Image } from 'react-native'
import { Workout } from '@/data/types'
import { Link } from 'expo-router'

type LiftCardParams = {
    workout: Workout,
}

function oneRepMax(weight: number, reps: number)
{
    // https://www.athlegan.com/calculate-1rm
    return weight * (36 / (37 - reps))
}

export function LiftCard(params: LiftCardParams) {
    return (
        <Link href="workout">
            <View style={styles.container}>
                <Text>Image</Text>
                <View>
                    <Text>{params.workout.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</Text>
                    {params.workout.movements.map((movement, key) => {
                        let topSet = movement.sets.sort((a, b) => (oneRepMax(a.percent, a.reps) - oneRepMax(b.percent, b.reps)))[movement.sets.length - 1];
                        return <View key={key}>
                            <Text>{movement.name}</Text>
                            <Text>Top set: {topSet.percent * movement.max} x {topSet.reps}{topSet.amrap ? '+' : ''}</Text>
                        </View>
                    })}
                </View>
                <Text>{params.workout.complete ? 'Complete' : ''}&gt;</Text>
            </View>
        </Link>
        )
  }

  const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
    },
    image: {}
  })