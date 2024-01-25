import repMaxCalc from '@/RepMaxCalc'
import { Movement } from '@/data/types'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export function TopSet({ movement }: { movement: Movement }) {
    let topSet = repMaxCalc(movement)
    return (
        <View>
            <Text>{movement.name}</Text>
            <Text>Top set: {topSet.percent * movement.max} x {topSet.reps}{topSet.amrap ? '+' : ''}</Text>
        </View>
    )
}