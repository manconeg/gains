import { StyleSheet, View, Image } from 'react-native'
import { Movement, Set, Workout } from '@/data/types'
import repMaxCalc from '@/RepMaxCalc'
import { Link } from 'expo-router'
import { useTheme, Text, Card, Icon } from 'react-native-paper'
import { TopSet } from '@/atoms'

type MovementCardParams = {
    workoutId: number,
    movementId: number,
    movement: Movement,
}

export function MovementCard({workoutId, movementId, movement}: MovementCardParams) {
    const styles = makeStyles();

    return (
        <Link href={`workout/${workoutId}/movement/${movementId}`} style={{width: '100%', marginTop: 2}}>
            <Card mode={movement.complete ? 'contained' : 'elevated'}  style={{width: '100%'}}>
                <Card.Content style={styles.container}>
                    <Icon source="camera" size={50} />
                    <TopSet movement={movement}/>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Text>{movement.complete ? 'Complete ' : ''}&gt;</Text>
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