import { TopSet } from '@/atoms'
import { Workout } from '@/data/types'
import { Link, router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text, useTheme } from 'react-native-paper'

type LiftCardParams = {
    workout: Workout,
    id: number,
}

export function WorkoutCard({ id, workout }: LiftCardParams) {
    const styles = makeStyles();

    return (
        // <Link href={`workout/${id}`} style={styles.link}>
            <Card mode={workout.complete ? 'contained' : 'elevated'} style={styles.card} onPress={() => router.navigate(`workout/${id}`)}>
                <Card.Content style={styles.container}>
                    <Icon source="camera" size={50} />
                    <View>
                        <Text>{workout.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</Text>
                        {workout.movements.map((movement, key) => <TopSet key={key} movement={movement} />)}
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text>{workout.complete ? 'Complete ' : ''}&gt;</Text>
                        </View>
                    </View>
                </Card.Content>
            </Card>
        // </Link>
    )
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
        container: {
            flexDirection: 'row',
        },
        link: {
            // width: '100%',
            marginTop: 5,
            backgroundColor: 'red',
            // flexDirection: 'column',
            // flexBasis: 'auto',
            // flexShrink: 0,
            // display: 'flex',
            // alignItems: 'stretch',
            // position: 'relative',
            // zIndex: 0,
            // justifyContent: 'flex-end',
        },
        card: {
            // position: 'relative',
            // width: '100%',
            // flex: 1,
            // flexGrow: 1,
            // flexShrink: 0,
            // flexBasis: '100%',
            marginTop: 5,
            // backgroundColor: 'blue',
        },
    })
}