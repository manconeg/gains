import { StyleSheet, View, Image } from 'react-native'
import { Movement, Set, Workout } from '@/data/types'
import repMaxCalc from '@/RepMaxCalc'
import { Link } from 'expo-router'
import { useTheme, Text, Card, Icon } from 'react-native-paper'
import { TopSet } from '@/atoms'

type LiftCardParams = {
    workout: Workout,
    id: number,
}

export function WorkoutCard({id, workout}: LiftCardParams) {
    const styles = makeStyles();

    return (
        <Link href={`workout/${id}`} style={{width: '100%', marginTop: 2}}>
            <Card mode={workout.complete ? 'contained' : 'elevated'}  style={{width: '100%'}}>
                <Card.Content style={styles.container}>
                    <Icon source="camera" size={50} />
                    <View>
                        <Text>{workout.date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) }</Text>
                        {workout.movements.map((movement, key) => <TopSet key={key} movement={movement}/>)}
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