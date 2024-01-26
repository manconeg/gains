import { TopSet } from '@/atoms'
import { Workout } from '@/data/types'
import { LiftCard } from '@/molecules'
import { StyleSheet } from 'react-native'
import { Text, useTheme, Icon } from 'react-native-paper'

type LiftCardParams = {
    workout: Workout,
    id: number,
}

export function WorkoutCard({ id, workout }: LiftCardParams) {
    const styles = makeStyles();

    return (
        <LiftCard href={`workout/${id}`} mode={workout.complete ? 'contained' : 'elevated'}>
            <LiftCard.Left>
                <Icon source="camera" size={50} />
            </LiftCard.Left>
             <LiftCard.Content>
                 <Text>{workout.date.toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })}</Text>
                 {workout.movements.map((movement, key) => <TopSet key={key} movement={movement} />)}
             </LiftCard.Content>
             <LiftCard.Action>
                 <Text>{workout.complete ? 'Complete ' : ''}&gt;</Text>
             </LiftCard.Action>
        </LiftCard>
    )
}

function makeStyles() {
    const theme = useTheme();

    return StyleSheet.create({
    })
}