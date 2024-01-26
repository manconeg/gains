import { TopSet } from '@/atoms'
import { Movement } from '@/data/types'
import { LiftCard } from '@/molecules/LiftCard'
import { StyleSheet } from 'react-native'
import { Text, useTheme, Icon } from 'react-native-paper'

type MovementCardParams = {
    workoutId: number,
    movementId: number,
    movement: Movement,
}

export function MovementCard({ workoutId, movementId, movement }: MovementCardParams) {
    const styles = makeStyles();

    return (
        <LiftCard href={`workout/${workoutId}/movement/${movementId}`} mode={movement.complete ? 'contained' : 'elevated'}>
            <LiftCard.Left>
                <Icon source="camera" size={50} />
            </LiftCard.Left>
             <LiftCard.Content>
                <TopSet movement={movement} />
             </LiftCard.Content>
             <LiftCard.Action>
                <Text>{movement.complete ? 'Complete ' : ''}&gt;</Text>
             </LiftCard.Action>
        </LiftCard>
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