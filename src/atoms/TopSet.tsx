import { repMaxCalc } from '@/RepMaxCalc'
import { Movement } from '@/models'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export function TopSet({ movement, large = undefined }: { movement: Movement, large?: boolean | undefined }) {
    let topSet = repMaxCalc(movement)
    return (
        <View>
            {large ? (
                <View>
                    <Text>{movement.name}</Text>
                    <Text>Top set: {topSet.percent * movement.max} x {topSet.reps}{topSet.amrap ? '+' : ''}</Text>
                </View>
            ) : (
                <Text>{movement.name} - Top set: {topSet.percent * movement.max} x {topSet.reps}{topSet.amrap ? '+' : ''}</Text>
            )}
        </View>
    )
}