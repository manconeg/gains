import { StyleSheet, View, Image } from 'react-native'
import { Workout } from '@/data/types'
import { Link } from 'expo-router'
import { useTheme, Text, Card, Icon } from 'react-native-paper'



type LiftCardParams = {
    workout: Workout,
    id: number,
}

function oneRepMax(weight: number, reps: number)
{
    // https://www.athlegan.com/calculate-1rm
    return weight * (36 / (37 - reps))
}

export function LiftCard({id, workout}: LiftCardParams) {
    const styles = makeStyles();

    return (
        <Link href={`workout/${id}`} style={{width: '100%', marginTop: 2}}>
            <Card mode={workout.complete ? 'contained' : 'outlined'}  style={{width: '100%'}}>
                <Card.Content style={styles.container}>
                    <Icon source="camera" size={50} />
                    <View>
                        <Text>{workout.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</Text>
                        {workout.movements.map((movement, key) => {
                            let topSet = movement.sets.sort((a, b) => (oneRepMax(a.percent, a.reps) - oneRepMax(b.percent, b.reps)))[movement.sets.length - 1];
                            return <View key={key}>
                                <Text>{movement.name}</Text>
                                <Text>Top set: {topSet.percent * movement.max} x {topSet.reps}{topSet.amrap ? '+' : ''}</Text>
                            </View>
                        })}
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text>{workout.complete ? 'Complete ' : ''}&gt;</Text>
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