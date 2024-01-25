import { Movement } from '@/data/types'
import repMaxCalc from '@/RepMaxCalc'
import { useTheme, Text, Card, Icon } from 'react-native-paper'
import { StyleSheet, View, Image } from 'react-native'

export function TopSet({movement}: {movement: Movement}) {
    let topSet = repMaxCalc(movement)
    return (
        <View>
            <Text>{movement.name}</Text>
            <Text>Top set: {topSet.percent * movement.max} x {topSet.reps}{topSet.amrap ? '+' : ''}</Text>
        </View>
        )
}