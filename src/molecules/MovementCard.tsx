import { TopSet } from '@/atoms'
import { Movement } from '@/data/types'
import { Link, router } from 'expo-router'
import { StyleSheet, View } from 'react-native'
import { Card, Icon, Text, useTheme } from 'react-native-paper'

type MovementCardParams = {
    workoutId: number,
    movementId: number,
    movement: Movement,
}

export function MovementCard({ workoutId, movementId, movement }: MovementCardParams) {
    const styles = makeStyles();

    return (
        // <Link href={`workout/${workoutId}/movement/${movementId}`} style={{ width: '100%', marginTop: 2 }}>
            <Card mode={movement.complete ? 'contained' : 'elevated'} style={{ width: '100%', marginTop: 2 }} onPress={() => router.navigate(`workout/${workoutId}/movement/${movementId}`)}>
                <Card.Content style={styles.container}>
                    <Icon source="camera" size={50} />
                    <TopSet movement={movement} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text>{movement.complete ? 'Complete ' : ''}&gt;</Text>
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
    })
}