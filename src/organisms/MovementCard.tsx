import { Movement } from '@/models';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';

type MovementCardParams = {
    workoutId: string,
    movement: Movement,
}

export function MovementCard({ workoutId, movement }: MovementCardParams) {
    const styles = makeStyles();

    return (
        <View style={{ alignItems: 'center' }}>
            <Link href={`workout/${workoutId}/movement/${movement.id}`}><Button>{movement.name}</Button></Link>
            {movement.setGroups.map(setGroup =>
                <View key={setGroup.id} style={{ alignItems: 'center' }}>
                    <Text style={{ alignSelf: 'center' }}>{setGroup.name}</Text>
                    {setGroup.sets.map(set =>
                        <Text key={set.id}>{movement.max * set.percent}x{set.reps}{set.amrap && '+'}</Text>
                    )}
                </View>)}
        </View>
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