import { StyleSheet, View, Image } from 'react-native'
import { Workout } from '@/data/types'
import { Link } from 'expo-router'
import { useTheme, Text, Card, Icon } from 'react-native-paper'



type LiftCardParams = {
    workout: Workout,
}

function oneRepMax(weight: number, reps: number)
{
    // https://www.athlegan.com/calculate-1rm
    return weight * (36 / (37 - reps))
}

export function LiftCard(params: LiftCardParams) {
    const workout = params.workout
    const styles = makeStyles();

    return (
        <Link href="workout" style={{width: '100%', marginTop: 2}}>
            <Card mode={workout.complete ? 'contained' : 'outlined'}  style={{width: '100%'}}>
                <Card.Content style={styles.container}>
                    <Icon source="camera" size={50} />
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
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text>{params.workout.complete ? 'Complete ' : ''}&gt;</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </Link>
        )
  }

  function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
        },
    })
}